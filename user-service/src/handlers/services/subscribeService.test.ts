import { SubscribeService } from './subscribeService'

describe('subscribe service', () => {
  const service = new SubscribeService()
  it('should return hello string', () => {
    const data = 'data'
    const response = service.execute(data)
    expect(response).toBe('data')
  })
})
