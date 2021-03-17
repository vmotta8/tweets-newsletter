import { IRepository } from '../../lib/repositories/IRepository'
import { IUnsubscribeDTO } from './dtos/IUnsubscribeDTO'

export class UnsubscribeService {
  constructor (
    private repository: IRepository
  ) {}

  async execute (data: IUnsubscribeDTO): Promise<{ message: string; }> {
    return { message: 'OK' }
  }
}
