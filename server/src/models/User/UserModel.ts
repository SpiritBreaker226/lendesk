import { Entity, Schema } from 'redis-om'

import { dbClient } from '../../db'
import { User } from '../../types'

// needs to be here so that User Model have access to the types
// also needs to be a interface since there is a naming conflect with
// the UserModel classs if we use type
export interface UserModel extends User {
  entityId: string
}

export class UserModel extends Entity {
  toJSON() {
    const user = this
    const userObject = user.toRedisJson()

    delete userObject.password
    delete userObject.tokens

    return userObject
  }
}

// needs to be close to the fetch as Redis om does not like having
// schema in another file
export const userSchema = new Schema(UserModel, {
  id: { type: 'string' },
  firstName: { type: 'string' },
  lastName: { type: 'string' },
  email: { type: 'string' },
  password: { type: 'string' },
  tokens: { type: 'string[]' },
})

export const userRepository = dbClient.fetchRepository(userSchema)

const createIndex = async () => {
  await userRepository.createIndex()
}

createIndex()
