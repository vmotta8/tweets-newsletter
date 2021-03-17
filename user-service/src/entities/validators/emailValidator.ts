export function emailValidator (email: string): boolean {
  if (email === null || email === undefined) {
    return false
  }

  if (email.length > 320) {
    return false
  }

  const regex = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

  if (!regex.test(email)) {
    return false
  }

  const [local, domain] = email.split('@')

  if (local.length > 64 || local.length === 0) {
    return false
  }

  if (domain.length > 255 || domain.length === 0) {
    return false
  }

  const domainParts = domain.split('.')

  if (domainParts.some(function (parts) {
    return parts.length > 63
  })) {
    return false
  }

  return true
}
