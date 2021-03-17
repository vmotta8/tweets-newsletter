import { SubscribeService } from './subscribeService'

describe('hello service', () => {
  const helloService = new SubscribeService()
  it('should return hello string', () => {
    const helloString = helloService.execute()
    expect(helloString).toBe('Hello!!')
  })
})
