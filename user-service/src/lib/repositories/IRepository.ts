import { ItemList } from 'aws-sdk/clients/dynamodb'
import { User } from '../../entities/User'

export interface IRepository {
  save (user: User): Promise<void>;
  findByEmail (email: string): Promise<boolean | ItemList>;
}
