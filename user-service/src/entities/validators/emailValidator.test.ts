import { emailValidator } from './emailValidator'

describe('email validation', () => {
  it('should not accept null strings', () => {
    const email: any = null
    expect(emailValidator(email)).toBeFalsy()
  })

  it('should not accept undefined strings', () => {
    const email: any = undefined
    expect(emailValidator(email)).toBeFalsy()
  })

  it('should not accept empty strings', () => {
    const email: string = ''
    expect(emailValidator(email)).toBeFalsy()
  })

  it('should accept valid email', () => {
    const email: string = 'myname@email.com'
    expect(emailValidator(email)).toBeTruthy()
  })

  it('should not accept local part larger than 64 chars', () => {
    const email: string = 'l'.repeat(65) + '@email.com'
    expect(emailValidator(email)).toBeFalsy()
  })

  it('should not accept domain larger than 255 chars', () => {
    const email: string = 'local@' + 'd'.repeat(260) + '.com'
    expect(emailValidator(email)).toBeFalsy()
  })

  it('should not accept strings larger than 320 chars', () => {
    const email: string = 'l'.repeat(64) + '@' + 'c'.repeat(128) + '.' + 'd'.repeat(128)
    expect(emailValidator(email)).toBeFalsy()
  })

  it('should not accept empty local part', () => {
    const email: string = '@email.com'
    expect(emailValidator(email)).toBeFalsy()
  })

  it('should not accept empty domain', () => {
    const email: string = 'myname@'
    expect(emailValidator(email)).toBeFalsy()
  })

  it('should not accept domain with a part larger than 63 chars', () => {
    const email: string = 'myname@' + 'd'.repeat(64) + '.com'
    expect(emailValidator(email)).toBeFalsy()
  })

  it('should not accept empty local part with invalid char', () => {
    const email: string = 'my name@email.com'
    expect(emailValidator(email)).toBeFalsy()
  })
})
