import { UserModel, userRepository } from '../UserModel'

export const logout = async (user: UserModel, reqToken: string) => {
  user.tokens = user.tokens.filter((token) => token !== reqToken)

  await userRepository.save(user)
}
