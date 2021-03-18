import { UnsubscribeService } from '../../../src/handlers/services/unsubscribeService'
import { DynamoRepositoryInMemory } from '../../lib/repositories/DynamoRepositoryInMemory'

const service = new UnsubscribeService(
  new DynamoRepositoryInMemory()
)

describe('unsubscribe service', () => {
  it('should return an error if email not found', async () => {
    const data = {
      email: 'email@email.com'
    }

    try {
      await service.execute(data)
      expect(true).toBe(false)
    } catch (error) {
      expect(error.message).toBe('Email not found.')
    }
  })

  it('should return an error if user already unsubscribed', async () => {
    const data = {
      email: 'inactive@email.com'
    }
    try {
      await service.execute(data)
      expect(true).toBe(false)
    } catch (error) {
      expect(error.message).toBe('You have already unsubscribed, but you will be welcome if you want to come back !!')
    }
  })

  it('should inactivate the user if he is active', async () => {
    const data = {
      email: 'active@email.com'
    }
    const response = await service.execute(data)
    expect(response.message).toBe('Unsubscribed successfully!')
  })
})
