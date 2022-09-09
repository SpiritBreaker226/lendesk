import bcrypt from 'bcryptjs'

import { userRepository } from '../../User'

export const findByCredentials = async (email: string, password: string) => {
  const existingUser = await userRepository
    .search()
    .where('email')
    .equals(email)
    .returnFirst()

  if (!existingUser) {
    throw new Error('Either Username or password is not correct!')
  }

  const isMatch = await bcrypt.compare(password, existingUser.password)

  if (!isMatch) {
    throw new Error('Either Username or password is not correct!')
  }

  return existingUser || null
}
