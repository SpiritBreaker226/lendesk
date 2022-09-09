import bcrypt from 'bcryptjs'
import { User } from '../../../types'

import { userRepository } from '../UserModel'
import { isExistingUser } from './isExistingUser'

// Still unkonwn as to why Redis-om does not have basic validation
export const signUp = async (user: Omit<User, 'tokens'>) => {
  const { firstName, lastName, email, password } = user
  const isUserInDb = await isExistingUser(email)

  if (isUserInDb) {
    throw new Error('User is already in database')
  }

  const hashedPassword = await bcrypt.hash(password, 12)
  const newUser = userRepository.createAndSave({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    tokens: [],
  })

  return newUser
}
