import { UserModel, userRepository } from '../models'

// after searching there is no easy way of removing all data
export const setupDatabase = async () => {
  // so doing the long an painful route
  // get all users and remove them from the test database
  const users: UserModel[] = await userRepository.search().returnAll()

  users.forEach(async (user) => await userRepository.remove(user.entityId))
}
