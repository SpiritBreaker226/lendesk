import { User } from './User'

export type ServerError = {
  field?: keyof User
  errorMessage: string
}
