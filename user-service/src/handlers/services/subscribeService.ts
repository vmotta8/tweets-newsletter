import { IMailProvider } from '../../lib/providers/IMailProvider'
import { User } from '../../entities/User'
import { ISubscribeDTO } from './dtos/ISubscribeDTO'
// import { generateWelcomeTemplate } from '../../lib/providers/templates/welcome'
import { IRepository } from '../../lib/repositories/IRepository'
import axios from 'axios'
import createError from 'http-errors'
import { tokenHelper } from '../../helpers/tokenHelper'

async function sendTweets (email: string): Promise<void> {
  try {
    const sendTweetsUrl = process.env.SEND_TWEETS_URL || ''
    const data = await tokenHelper.generate()

    const headers = {
      Authorization: `Bearer ${data.id_token}`
    }

    await axios.post(`${sendTweetsUrl}/${email}`,
      {},
      {
        headers: headers
      })
  } catch (err) {
    console.log(err)
    throw new createError.Unauthorized('Error on sending tweets.')
  }
}

export class SubscribeService {
  constructor (
    private mail: IMailProvider,
    private repository: IRepository
  ) {}

  async execute (data: ISubscribeDTO): Promise<any> {
    const user = await this.repository.findByEmail(data.email)

    if (!user) {
      try {
        const newUser = new User(data)

        this.repository.save(newUser)

        // const template = generateWelcomeTemplate(newUser.email)
        // const message = {
        //   queueURL: process.env.MAIL_QUEUE_URL || '',
        //   subject: template.subject,
        //   recipient: newUser.email,
        //   body: template.html
        // }

        // this.mail.sendMessage(message)

        sendTweets(data.email)

        return { message: 'You have been subscribed. Be welcome!!' }
      } catch (err) {
        console.log(err)
        throw new createError.InternalServerError('Error on subscribe.')
      }
    }

    if (user.status !== 'ACTIVE') {
      await this.repository.changeStatus(user.id, 'ACTIVE')
      return { message: 'You have been subscribed. Welcome back!!' }
    }

    console.log(user)
    throw new createError.BadRequest('You are already subscribed, enjoy the news !!')
  }
}
