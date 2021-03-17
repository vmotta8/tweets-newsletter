import { User } from '../../entities/User'

export interface IRepository {
  save (user: User): Promise<void>;
  findByEmail (email: string): Promise<boolean>;
}
