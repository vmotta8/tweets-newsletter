/* eslint-disable no-useless-constructor */
import { ISendDTO } from '../dtos/ISendDTO'
import { TweetsHelper } from '../../helpers/tweetsHelper'
import { IMailProvider } from '../../lib/providers/IMailProvider'
import { ICacheProvider } from '../../lib/providers/ICacheProvider'
import { HtmlHelper } from '../../helpers/htmlHelper'
import createError from 'http-errors'

export class SendService {
  constructor (
    private mail: IMailProvider,
    private cache: ICacheProvider
  ) {}

  async execute (data: ISendDTO, users: string[]) {
    let allTweets: any[] = []

    this.cache.connect()
    for (const user of users) {
      let tweets: any
      try {
        const cacheEntry = await this.cache.get(`users:${user}`)
        if (cacheEntry) {
          tweets = JSON.parse(cacheEntry)
        } else {
          tweets = await TweetsHelper.collectTweets(user)

          const redisTweets = TweetsHelper.sortTweets(tweets, 15)
          await this.cache.set(`users:${user}`, JSON.stringify(redisTweets), 3600)
        }

        allTweets = allTweets.concat(tweets)
        allTweets = TweetsHelper.sortTweets(allTweets, 15)
      } catch (err) {
        console.log(err)
        throw new createError.Unauthorized(err)
      }
    }
    this.cache.disconnect()

    allTweets = TweetsHelper.removeRepeated(allTweets)
    allTweets = TweetsHelper.sortTweets(allTweets, 10)

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
