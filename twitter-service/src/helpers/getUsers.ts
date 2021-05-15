import axios from 'axios'
import createError from 'http-errors'
import { tokenHelper } from './tokenHelper'

export const getUsers = {
  async get (): Promise<any> {
    try {
      const getUsersUrl = process.env.GET_USERS_URL || ''
      const token = await tokenHelper.generate()

      const headers = {
        Authorization: token
      }

      const response = await axios.get(getUsersUrl,
        {
          headers: headers
        })

      return response.data
    } catch (err) {
      console.log(err)
      throw new createError.Unauthorized('Error on getting users.')
    }
  }
}
