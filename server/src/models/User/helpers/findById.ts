import { userRepository } from '../UserModel'

export const findById = async (id: string) => {
  const existingUser = await userRepository
    .search()
    .where('id')
    .eq(id)
    .returnFirst()

  return existingUser || null
}
