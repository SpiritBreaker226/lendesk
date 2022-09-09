import { faker } from '@faker-js/faker'

import { findByCredentials } from '../findByCredentials'
import { createUser, userOne } from '../../../../testUtils'

describe('findByCredentials', () => {
  it('should throw error when no user is found', async () => {
    const password = '1Qd*189327'
    await createUser({ ...userOne, password })

    expect(
      await findByCredentials(faker.internet.email(), password)
    ).toThrowError('Either Username or password is not correct!')
  })

  it('should throw error when email and passdoes does not match database', async () => {
    const email = faker.internet.email()
    await createUser({ ...userOne, email })

    expect(await findByCredentials(email, 'doesNotexist')).toThrowError(
      'Either Username or password is not correct!'
    )
  })

  it('should get user when email and password matches', async () => {
    const email = faker.internet.email()
    const password = '1Qd*189327'
    await createUser({ ...userOne, password })

    const user = await findByCredentials(email, password)

    expect(user).toEqual(expect.objectContaining({ entryid: user.entityId }))
  })
})
