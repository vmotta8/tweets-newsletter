import { IRepository } from '../../../src/lib/repositories/IRepository'
import { User } from '../../../src/entities/User'

export class DynamoRepositoryInMemory implements IRepository {
  private db: User[]
  constructor () {
    this.db = [{
      id: '123456',
      email: 'inactive@email.com',
      status: 'INACTIVE'
    }]
  }

  async changeStatus (id: string, status: string): Promise<any> {
    return true
  }

  async findAll (): Promise<any> {
    return this.db
  }

  async findByEmail (email: string): Promise<false | any> {
    const result = this.db.find(user => user.email === email)
    if (result) {
      return result
    }

    return false
  }

  async save (user: User): Promise<void> {
    this.db.push(user)
  }
}
