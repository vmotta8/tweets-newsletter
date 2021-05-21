import { uuidHelper } from '../helpers/uuidHelper'

export class User {
  public readonly id: string;
  public readonly status: string;
  public email: string;

  constructor (props: Omit<User, 'id' | 'status'>) {
    this.id = uuidHelper.create()
    this.status = 'ACTIVE'
    this.email = props.email
  }
}
