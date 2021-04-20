import { tokenHelper } from '../../src/helpers/tokenHelper'

describe('token helper', () => {
  it('should return a bearer token', async () => {
    const data = await tokenHelper.generateauth0()
    expect(data.token_type).toBe('Bearer')
  })

  it('should return a cognito bearer token', async () => {
    const data = await tokenHelper.generate()
    expect(typeof data).toBe('string')
  })
})
