import { SendService } from '../../../src/handlers/services/sendService'
import { SESMailProviderInMemory } from '../../lib/providers/SESMailProviderInMemory'

const service = new SendService(
  new SESMailProviderInMemory()
)

describe('send service', () => {
  it('should return tweets', async () => {
    const users = await service.execute({ email: 'viniciusmotta8@gmail.com' })
    expect(users).toEqual([{ email: 'active@email.com', status: 'ACTIVE' }])
  })
})
