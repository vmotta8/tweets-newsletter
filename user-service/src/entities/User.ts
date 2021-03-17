import { uuidHelper } from '../helpers/uuidHelper'
import { emailValidator } from './validators/emailValidator'
import createError from 'http-errors'

export class User {
  public readonly id: string;

  public email: string;

  constructor (props: Omit<User, 'id'>) {
    this.id = uuidHelper.create()

    if (emailValidator(props.email)) {
      this.email = props.email
    } else {
      throw new createError.NotAcceptable('Invalid email.')
    }
  }
}
