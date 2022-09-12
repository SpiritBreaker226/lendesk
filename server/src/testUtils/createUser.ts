import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

import { UserModel, userRepository } from '../models'
import { User } from '../types'

export const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  tokens = [],
}: User): Promise<UserModel> => {
  const hashedPassword = await bcrypt.hash(password, 12)

  return await userRepository.createAndSave({
    id: uuidv4(),
    firstName,
    lastName,
    email,
    password: hashedPassword,
    tokens,
  })
}
