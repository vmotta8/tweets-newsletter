import { v4 as uuid } from 'uuid'

export const uuidHelper = {
  create (): string {
    const id = uuid()

    return id
  }
}
