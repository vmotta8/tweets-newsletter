/* eslint-disable no-useless-constructor */
import { TweetsHelper } from '../../helpers/tweetsHelper'
import { IMailProvider } from '../../lib/providers/IMailProvider'
import { HtmlHelper } from '../../helpers/htmlHelper'
import createError from 'http-errors'
import { getUsers } from '../../helpers/getUsers'

export class SendAllService {
  constructor (
    private mail: IMailProvider
  ) {}

  async execute (users: string[]): Promise<any> {
    let allTweets: any[] = []
    const subscribers = await getUsers.get()

    for (const user of users) {
      try {
        const tweets = await TweetsHelper.collectTweets(user)
        allTweets = allTweets.concat(tweets)
        allTweets = TweetsHelper.sortTweets(allTweets, 15)
      } catch (err) {
        console.log(err)
        throw new createError.Unauthorized(err)
      }
    }

    allTweets = TweetsHelper.removeRepeated(allTweets)
    allTweets = TweetsHelper.sortTweets(allTweets, 10)

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

    return { message: 'All news was sent successfully!' }
  }
}
