/* eslint-disable no-useless-constructor */
import { ISendDTO } from '../dtos/ISendDTO'
import { TweetsHelper } from '../../helpers/tweetsHelper'
import { IMailProvider } from '../../lib/providers/IMailProvider'
import { HtmlHelper } from '../../helpers/htmlHelper'
import createError from 'http-errors'

export class SendService {
  constructor (
    private mail: IMailProvider
  ) {}

  async execute (data: ISendDTO, users: string[]) {
    let allTweets: any[] = []

    for (const user of users) {
      try {
        const tweets = await TweetsHelper.collectTweets(user)
        allTweets = allTweets.concat(tweets)
      } catch (err) {
        console.log(err)
        throw new createError.Unauthorized('Unauthorized, check twitter credentials.')
      }
    }

    const sortedTweets = TweetsHelper.sortTweets(allTweets)

    const html = HtmlHelper.generate(sortedTweets, data.email)

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
