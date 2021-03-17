import { SubscribeService } from './subscribeService'

describe('subscribe service', () => {
  const service = new SubscribeService()
  it('should return hello string', () => {
    const data = {
      email: 'email@gmail.com'
    }
    const response = service.execute(data)
    expect(response.email).toBe('email@gmail.com')
  })
})
