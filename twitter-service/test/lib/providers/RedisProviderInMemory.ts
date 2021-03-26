import { ICacheProvider } from '../../../src/lib/providers/ICacheProvider'

export class RedisProviderInMemory implements ICacheProvider {
  async get (name: string): Promise<any> {
    //
  }

  async set (name: string, data: any, time: number): Promise<void> {
    //
  }

  disconnect (): void {
    //
  }

  connect (): void {
    //
  }
}
