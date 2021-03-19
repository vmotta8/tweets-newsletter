/* eslint-disable no-useless-constructor */
import { TweetsHelper } from '../../helpers/tweetsHelper'
import { IMailProvider } from '../../lib/providers/IMailProvider'
import { HtmlHelper } from '../../helpers/htmlHelper'
import Twitter from 'twitter'
import createError from 'http-errors'
import axios from 'axios'
import { tokenHelper } from '../../helpers/tokenHelper'

async function getUsers (): Promise<any> {
  try {
    const getUsersUrl = process.env.GET_USERS_URL || ''
    const data = await tokenHelper.generate()

    const headers = {
      Authorization: `Bearer ${data.id_token}`
    }

    const response = await axios.get(getUsersUrl,
      {
        headers: headers
      })

    return response.data
  } catch (err) {
    console.log(err)
    throw new createError.Unauthorized('Error on getting users.')
  }
}

export class SendAllService {
  private client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY || '',
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET || '',
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY || '',
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || ''
  });

  constructor (
    private mail: IMailProvider
  ) {}

  async execute (): Promise<void> {
    let allTweets: any[] = []
    const subscribers = await getUsers()

    const users = ['thenextweb', 'engadget', 'techcrunch', 'techreview']

    for (const user of users) {
      try {
        let tweets = await this.client.get('statuses/user_timeline', {
          screen_name: user,
          count: 200,
          tweet_mode: 'extended',
          include_entities: 1,
          include_extended_entities: 1
        })

        tweets = TweetsHelper.rtFilter(tweets)
        const amount = TweetsHelper.sumTweets(tweets)
        const engagement = TweetsHelper.sumEngagement(tweets)
        tweets = TweetsHelper.dateFilter(tweets)

        tweets = TweetsHelper.usefulTweets(tweets, engagement, amount)

        allTweets = allTweets.concat(tweets)
      } catch (err) {
        console.log(err)
        throw new createError.Unauthorized('Unauthorized, check twitter credentials.')
      }
    }

    allTweets.sort(
      (a, b) => parseFloat(b.relevanceIndex) - parseFloat(a.relevanceIndex)
    )
    allTweets = allTweets.slice(0, 10)

    for (const subscriber of subscribers) {
      const html = HtmlHelper.generate(allTweets, subscriber.email)

      const message = {
        queueURL: process.env.MAIL_QUEUE_URL || '',
        subject: 'Tech Newsletter!!',
        recipient: subscriber.email,
        body: html
      }

      this.mail.sendMessage(message)
    }
  }
}