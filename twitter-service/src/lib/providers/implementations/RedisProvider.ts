import { ICacheProvider } from '../ICacheProvider'
import Redis from 'ioredis'

const redis = new Redis({
  port: parseInt(process.env.REDIS_PORT || '6369'),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD
})

export class RedisProvider implements ICacheProvider {
  connect (): void {
    console.log(redis.status)
    if (redis.status !== 'connecting') {
      redis.connect()
    }
  }

  disconnect (): void {
    redis.disconnect()
  }

  async set (name: string, data: any, time: number): Promise<void> {
    await redis.set(name, data, 'EX', time)
  }

  async get (name: string): Promise<any> {
    const cacheEntry = await redis.get(name)
    return cacheEntry
  }
}
