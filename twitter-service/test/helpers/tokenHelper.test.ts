import { tokenHelper } from '../../src/helpers/tokenHelper'

describe('token helper', () => {
  it('should return a bearer token', async () => {
    const data = await tokenHelper.generateauth0()
    expect(data.token_type).toBe('Bearer')
  })

  it('should return unauthorized error', async () => {
    process.env.AUTH_ID = '0000'
    try {
      await tokenHelper.generateauth0()
      expect(true).toBe(false)
    } catch (err) {
      expect(err.message).toBe('Wrong credentials')
    }
  })

  it('should return bad request error', async () => {
    try {
      delete process.env.AUTH_ID
      await tokenHelper.generateauth0()
      expect(true).toBe(false)
    } catch (err) {
      expect(err.message).toBe('Wrong envs.')
    }
  })

  it('should return a cognito bearer token', async () => {
    const data = await tokenHelper.generate()
    expect(data.token_type).toBe('Bearer')
  })
})
