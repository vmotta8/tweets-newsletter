import Validator from '@vmotta8/validator'
import { ISubscribeDTO } from '../handlers/services/dtos/ISubscribeDTO'

export const subscribeValidator = (data: ISubscribeDTO): ISubscribeDTO => {
  const formattedData = {
    email: Validator.validateEmail(data.email)
  }
  return formattedData
}
