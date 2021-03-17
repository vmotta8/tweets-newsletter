import { IMailProvider } from 'src/lib/providers/IMailProvider'
import { User } from '../../entities/User'
import { ISubscribeDTO } from './dtos/ISubscribeDTO'
import { generateWelcomeTemplate } from '../../lib/providers/templates/welcome'
import createError from 'http-errors'

export class SubscribeService {
  constructor (
    private mail: IMailProvider
  ) {}

  execute (data: ISubscribeDTO): User {
    const user = new User(data)

    if (!process.env.MAIL_QUEUE_URL) {
      throw new createError.NotAcceptable('Invalid queue url.')
    }

    const template = generateWelcomeTemplate()
    const message = {
      queueURL: process.env.MAIL_QUEUE_URL,
      subject: template.subject,
      recipient: user.email,
      body: template.html
    }

    this.mail.sendMessage(message)

    // send tweets to new user - process.env.SEND_TWEETS_URL

    return user
  }
}
