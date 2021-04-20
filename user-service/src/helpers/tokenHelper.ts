import axios from 'axios'
import qs from 'querystring'
import createError from 'http-errors'

export const tokenHelper = {
  async generateauth0 (): Promise<any | false> {
    const url = process.env.AUTH_URL
    const id = process.env.AUTH_ID
    const username = process.env.AUTH_USERNAME
    const password = process.env.AUTH_PASSWORD

    if (url === undefined || id === undefined || username === undefined || password === undefined) {
      console.log(url, id, username, password)
      throw new createError.BadRequest('Wrong envs.')
    }

    const data = {
      client_id: id,
      username: username,
      password: password,
      grant_type: 'password',
      scope: 'openid'
    }

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const response = await axios.post(url,
      qs.stringify(data),
      {
        headers: headers
      })

    return response.data
  },

  async generate(): Promise<any> {
    const url = `${process.env.COGNITO_URL}${process.env.COGNITO_REFRESH_TOKEN}`
    
    const response = await axios.post(url, {}, {
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      }
    })

    return response.data
  }
}
