import { uuidHelper } from '../helpers/uuidHelper'
import { emailValidator } from './validators/emailValidator'
import createError from 'http-errors'

export class User {
  public readonly id: string;
  public readonly status: string;

  public email: string;

  constructor (props: Omit<User, 'id' | 'status'>) {
    this.id = uuidHelper.create()
    this.status = 'ACTIVE'

    if (emailValidator(props.email)) {
      this.email = props.email
    } else {
      console.log(props.email)
      throw new createError.NotAcceptable('Invalid email.')
    }
  }
}
