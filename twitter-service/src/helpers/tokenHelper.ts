import axios from 'axios'

export const tokenHelper = {
  async generate (): Promise<any> {
    const url = `${process.env.COGNITO_URL}${process.env.COGNITO_REFRESH_TOKEN}`

    const response = await axios.post(url, {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    return response.data
  }
}
