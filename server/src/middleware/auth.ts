import { verify, JwtPayload } from 'jsonwebtoken'

import { userRepository } from '../models'

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')

    const decoded = verify(token, process.env.JWT_SERECT) as JwtPayload

    const user = await userRepository
      .search()
      .where('email')
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
    res.status(401).send({ error: 'Please authenticate.' })
  }
}
