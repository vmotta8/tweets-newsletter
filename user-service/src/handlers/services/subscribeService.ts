import { IMailProvider } from '../../lib/providers/IMailProvider'
import { User } from '../../entities/User'
import { ISubscribeDTO } from './dtos/ISubscribeDTO'
import { generateWelcomeTemplate } from '../../lib/providers/templates/welcome'
import { IRepository } from '../../lib/repositories/IRepository'
import createError from 'http-errors'

export class SubscribeService {
  constructor (
    private mail: IMailProvider,
    private repository: IRepository
  ) {}

  async execute (data: ISubscribeDTO): Promise<User> {
    const exist = await this.repository.findByEmail(data.email)

    if (exist) {
      console.log(exist)
      throw new createError.BadRequest('Email already exists.')
    }
    const user = new User(data)

    this.repository.save(user)

    const template = generateWelcomeTemplate()
    const message = {
      queueURL: process.env.MAIL_QUEUE_URL || '',
      subject: template.subject,
      recipient: user.email,
      body: template.html
    }

    this.mail.sendMessage(message)

    // send tweets to new user - process.env.SEND_TWEETS_URL

    return user
  }
}
