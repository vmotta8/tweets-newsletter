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

  async execute (data: ISubscribeDTO): Promise<any> {
    const user = await this.repository.findByEmail(data.email)

    if (!user) {
      const newUser = new User(data)

      this.repository.save(newUser)

      const template = generateWelcomeTemplate()
      const message = {
        queueURL: process.env.MAIL_QUEUE_URL || '',
        subject: template.subject,
        recipient: newUser.email,
        body: template.html
      }

      this.mail.sendMessage(message)

      // send tweets to new user - process.env.SEND_TWEETS_URL

      return { message: 'You have been subscribed. Be welcome!!' }
    }

    if (user.status !== 'ACTIVE') {
      await this.repository.changeStatus(user.id, 'ACTIVE')
      return { message: 'You have been subscribed. Welcome back!!' }
    }

    console.log(user)
    throw new createError.BadRequest('You are already subscribed, enjoy the news !!')
  }
}
