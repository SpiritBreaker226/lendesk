import { userRepository } from '../UserModel'

export const findById = async (id: string) => {
  const existingUser = await userRepository.fetch(id)

  return existingUser || null
}
