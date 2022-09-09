import { userRepository } from '../UserModel'

export const isExistingUser = async (email: string): Promise<boolean> => {
  const existingUser = await userRepository
    .search()
    .where('email')
    .equals(email)
    .returnFirst()

  return !!existingUser
}
