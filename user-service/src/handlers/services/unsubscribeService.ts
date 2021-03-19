import { IRepository } from '../../lib/repositories/IRepository'
import { IUnsubscribeDTO } from './dtos/IUnsubscribeDTO'
import createError from 'http-errors'

export class UnsubscribeService {
  constructor (
    private repository: IRepository
  ) {}

  async execute (data: IUnsubscribeDTO): Promise<any> {
    data.email = (data.email).toLowerCase()
    const user = await this.repository.findByEmail(data.email)
    if (!user) {
      throw new createError.BadRequest('Email not found.')
    }

    if (user.status === 'INACTIVE') {
      throw new createError.BadRequest('You have already unsubscribed, but you will be welcome if you want to come back !!')
    }

    await this.repository.changeStatus(user.id, 'INACTIVE')
    return { message: 'Unsubscribed successfully!' }
  }
}
