import { Request } from 'express'

import { UserModel } from '../models'

export type AuthRequest = {
  user: UserModel
  token: string
} & Request
