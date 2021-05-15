import axios from 'axios'

export const tokenHelper = {
  async generate (): Promise<any> {
    const url = process.env.COGNITO_URL || ''
    const authorization = process.env.COGNITO_AUTHORIZATION || ''

    const response = await axios.post(url, {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: authorization
      }
    })

    return response.data.access_token
  }
}
