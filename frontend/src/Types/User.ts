export type User = {
  firstName: string
  lastName: string
  email: string
}

export type NonAuthUser = {
  password: string
} & User
