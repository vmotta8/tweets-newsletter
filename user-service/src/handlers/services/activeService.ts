import { IRepository } from '../../lib/repositories/IRepository'
import { User } from '../../entities/User'
// import createError from 'http-errors'

export class ActiveService {
  constructor (
    private repository: IRepository
  ) {}

  async execute (): Promise<User[]> {
    let users = await this.repository.findAll()
    users = users.map((arr: any) => {
      delete arr.id
      return arr
    })

    return users
  }
}
