import { SendService } from '../../../src/handlers/services/sendService'
import { SESMailProviderInMemory } from '../../lib/providers/SESMailProviderInMemory'
import { RedisProviderInMemory } from '../../lib/providers/RedisProviderInMemory'

const service = new SendService(
  new SESMailProviderInMemory(),
  new RedisProviderInMemory()
)

describe('send service', () => {
  it('should return tweets', async () => {
    const response = await service.execute({ email: 'viniciusmotta8@gmail.com' }, ['vmotta8'])
    expect(response.message).toEqual('News sent successfully!')
  })
})
