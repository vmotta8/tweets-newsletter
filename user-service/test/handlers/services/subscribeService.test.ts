import { SubscribeService } from '../../../src/handlers/services/subscribeService'
import { SESMailProviderInMemory } from '../../lib/providers/SESMailProviderInMemory'
import { DynamoRepositoryInMemory } from '../../lib/repositories/DynamoRepositoryInMemory'

const service = new SubscribeService(
  new SESMailProviderInMemory(),
  new DynamoRepositoryInMemory()
)

describe('subscribe service', () => {
  process.env.MAIL_QUEUE_URL = 'https://any.com'
  it('should return the right email', async () => {
    const data = {
      email: 'email@email.com'
    }
    const response = await service.execute(data)
    expect(response.message).toBe('You have been subscribed. Be welcome!!')
  })

  it('should activate the user if he is inactive', async () => {
    const data = {
      email: 'inactive@email.com'
    }
    const response = await service.execute(data)
    expect(response.message).toBe('You have been subscribed. Welcome back!!')
  })

  it('should return an error if user already subscribed', async () => {
    const data = {
      email: 'email@email.com'
    }
    try {
      await service.execute(data)
      expect(true).toBe(false)
    } catch (error) {
      expect(error.message).toBe('You are already subscribed, enjoy the news !!')
    }
  })
})
