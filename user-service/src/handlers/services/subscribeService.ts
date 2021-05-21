import createError from 'http-errors'
import { User } from '../../entities/User'
import { ISubscribeDTO } from './dtos/ISubscribeDTO'
import { IRepository } from '../../lib/repositories/IRepository'
import { sendTweets } from '../../helpers/sendTweets'
import { subscribeValidator } from '../../validators/subscribeValidator'

export class SubscribeService {
  constructor (
    private repository: IRepository
  ) {}

  async execute (data: ISubscribeDTO): Promise<any> {
    data = subscribeValidator(data)
    console.log(data)

    const user = await this.repository.findByEmail(data.email)

    if (!user) {
      try {
        const newUser = new User(data)

        this.repository.save(newUser)

        sendTweets.send(data.email)

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
