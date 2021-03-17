import { SubscribeService } from '../../../src/handlers/services/subscribeService'
import { IMailProvider, IMessage } from '../../../src/lib/providers/IMailProvider'

export class SESMailProviderInMemory implements IMailProvider {
  async sendMessage (message: IMessage): Promise<void> {
    //
  }
}
const service = new SubscribeService(
  new SESMailProviderInMemory()
)

describe('subscribe service', () => {
  it('should return email', () => {
    process.env.MAIL_QUEUE_URL = 'https://any.com'
    const data = {
      email: 'email@gmail.com'
    }
    const response = service.execute(data)
    expect(response.email).toBe('email@gmail.com')
  })
})
