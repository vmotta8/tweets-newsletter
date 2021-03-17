import { uuidHelper } from '../../src/helpers/uuidHelper'

describe('jwt helper', () => {
  it('should return a string and right length', () => {
    const id = uuidHelper.create()
    const split = id.split('-')
    expect(typeof id).toBe('string')
    expect(split.length).toBe(5)
  })
})
