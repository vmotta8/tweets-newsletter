import { SendAllService } from '../../../src/handlers/services/sendAllService'
import { SESMailProviderInMemory } from '../../lib/providers/SESMailProviderInMemory'

const service = new SendAllService(
  new SESMailProviderInMemory()
)

describe('send all service', () => {
  it('should return message', async () => {
    const response = await service.execute(['wired'])
    expect(response.message).toEqual('All news was sent successfully!')
  })
})
