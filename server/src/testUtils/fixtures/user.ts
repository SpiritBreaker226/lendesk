import { faker } from '@faker-js/faker'

import { User } from '../../types'

const userOneEmail = faker.internet.email()
export const userOne: User = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: userOneEmail,
  password: faker.internet.password(),
  tokens: [],
}

const userTwoEmail = faker.internet.email()
export const userTwo: User = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: userTwoEmail,
  password: faker.internet.password(),
  tokens: [],
}
