/* eslint-disable no-useless-constructor */
import { ISendDTO } from '../dtos/ISendDTO'
import { TweetsHelper } from '../../helpers/tweetsHelper'
import { IMailProvider } from '../../lib/providers/IMailProvider'
import { HtmlHelper } from '../../helpers/htmlHelper'
import Twitter from 'twitter'
import createError from 'http-errors'

export class SendService {
  private client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY || '',
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET || '',
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY || '',
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || ''
  });

  constructor (
    private mail: IMailProvider
  ) {}

  async execute (data: ISendDTO) {
    let allTweets: any[] = []

    const users = ['wired', 'verge']

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

    const html = HtmlHelper.generate(allTweets, data.email)

    const message = {
      queueURL: process.env.MAIL_QUEUE_URL || '',
      subject: 'Tech Newsletter!!',
      recipient: data.email,
      body: html
    }

    this.mail.sendMessage(message)

    return { message: 'News sent successfully!' }
  }
}
