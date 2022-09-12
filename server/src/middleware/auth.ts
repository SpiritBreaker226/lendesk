import { NextFunction, Response } from 'express'
import { verify, JwtPayload } from 'jsonwebtoken'

import { userRepository } from '../models'
import { AuthRequest } from '../types'

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')

    const decoded = verify(token, process.env.JWT_SERECT) as JwtPayload

    const user = await userRepository
      .search()
      .where('id')
      .eq(decoded._id)
      .and('tokens')
      .contain(token)
      .returnFirst()

    if (user) {
      req.token = token
      req.user = user
      return next()
    }

    throw new Error()
  } catch (error) {
    res.status(401).send('Please authenticate.')
  }
}
