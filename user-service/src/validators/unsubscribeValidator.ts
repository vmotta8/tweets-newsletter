import Validator from '@vmotta8/validator'
import { IUnsubscribeDTO } from '../handlers/services/dtos/IUnsubscribeDTO'

export const unsubscribeValidator = (data: IUnsubscribeDTO): IUnsubscribeDTO => {
  const formattedData = {
    email: Validator.validateEmail(data.email)
  }
  return formattedData
}
