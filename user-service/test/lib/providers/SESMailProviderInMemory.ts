import { IMailProvider, IMessage } from '../../../src/lib/providers/IMailProvider'

export class SESMailProviderInMemory implements IMailProvider {
  async sendMessage (message: IMessage): Promise<void> {
    //
  }
}
