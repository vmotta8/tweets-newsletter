import axios from 'axios'
import createError from 'http-errors'
import { tokenHelper } from './tokenHelper'

export const sendTweets = {
  async send (email: string): Promise<void> {
    try {
      const sendTweetsUrl = process.env.SEND_TWEETS_URL || ''
      const data = await tokenHelper.generate()

      const headers = {
        Authorization: `Bearer ${data.id_token}`
      }

      await axios.post(`${sendTweetsUrl}/${email}`,
        {},
        {
          headers: headers
        })
    } catch (err) {
      console.log(err)
      throw new createError.Unauthorized('Error on sending tweets.')
    }
  }
}
