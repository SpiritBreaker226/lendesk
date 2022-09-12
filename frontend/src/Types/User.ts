export type User = {
  firstName: string
  lastName: string
  email: string
}

export type AuthUser = {
  id: string
} & User

export type NonAuthUser = {
  password: string
} & User
