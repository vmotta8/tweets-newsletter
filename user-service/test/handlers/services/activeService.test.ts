import { ActiveService } from '../../../src/handlers/services/activeService'
import { DynamoRepositoryInMemory } from '../../lib/repositories/DynamoRepositoryInMemory'

const service = new ActiveService(
  new DynamoRepositoryInMemory()
)

describe('active service', () => {
  it('should return active users without id', async () => {
    const users = await service.execute()
    expect(users).toEqual([{ email: 'active@email.com', status: 'ACTIVE' }])
  })
})
