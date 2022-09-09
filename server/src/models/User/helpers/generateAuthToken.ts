import { sign } from 'jsonwebtoken'

import { UserModel, userRepository } from '../UserModel'

export const generateAuthToken = async (user: UserModel): Promise<string> => {
  // using email for the id as as search for id seems ot not be possible
  const token = sign({ _id: user.email }, process.env.JWT_SERECT)

  user.tokens.push(token)

  userRepository.save(user)

  return token
}
