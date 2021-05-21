import axios from 'axios'
import { tokenHelper } from '../../src/helpers/tokenHelper'
import { sendTweets } from '../../src/helpers/sendTweets'

describe('send tweets', () => {
  it('should return an error', async () => {
    tokenHelper.generate = jest.fn((): any => {
      return '12345'
    })

    axios.post = jest.fn((): any => {
      throw new Error()
    })

    try {
      await sendTweets.send('viniciusmotta8@gmail.com')
      expect(true).toBe(false)
    } catch (error) {
      expect(error.message).toBe('Error on sending tweets.')
    }
  })
})
