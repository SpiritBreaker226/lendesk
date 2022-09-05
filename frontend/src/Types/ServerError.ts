import { NonAuthUser } from './User'

export type ServerError = {
  field?: keyof NonAuthUser
  errorMessage: string
}
