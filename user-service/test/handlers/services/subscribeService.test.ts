import { SubscribeService } from '../../../src/handlers/services/subscribeService'
import { IMailProvider, IMessage } from '../../../src/lib/providers/IMailProvider'
import { IRepository } from '../../../src/lib/repositories/IRepository'
import { User } from '../../../src/entities/User'

export class SESMailProviderInMemory implements IMailProvider {
  async sendMessage (message: IMessage): Promise<void> {
    //
  }
}

export class DynamoRepositoryInMemory implements IRepository {
  private db: User[]
  constructor () {
    this.db = []
  }

  async findAll (): Promise<any> {
    return this.db
  }

  async findByEmail (email: string): Promise<false | any> {
    const result = this.db.find(user => user.email === email)
    if (result) {
      return true
    }

    return false
  }

  async save (user: User): Promise<void> {
    this.db.push(user)
  }
}

const service = new SubscribeService(
  new SESMailProviderInMemory(),
  new DynamoRepositoryInMemory()
)

describe('subscribe service', () => {
  it('should return the right email', async () => {
    process.env.MAIL_QUEUE_URL = 'https://any.com'
    const data = {
      email: 'email@gmail.com'
    }
    const response = await service.execute(data)
    expect(response.email).toBe('email@gmail.com')
  })

  it('should return an error if email already exists', async () => {
    process.env.MAIL_QUEUE_URL = 'https://any.com'
    const data = {
      email: 'email@gmail.com'
    }
    try {
      await service.execute(data)
      expect(true).toBe(false)
    } catch (error) {
      expect(error.message).toBe('Email already exists.')
    }
  })
})
