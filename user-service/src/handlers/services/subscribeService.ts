import { User } from '../../entities/User'
import { ISubscribeDTO } from './dtos/ISubscribeDTO'

export class SubscribeService {
  /*
  constructor(
    private repository: IRepository
  ) {}
  */
  execute (data: ISubscribeDTO): User {
    const user = new User(data)
    return user
  }
}
