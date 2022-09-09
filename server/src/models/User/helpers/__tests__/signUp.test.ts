import { signUp } from '../signUp'
import { createUser, userOne } from '../../../../testUtils'

describe('signUp', () => {
  it('should throw error when email is already in the database', async () => {
    await createUser(userOne)

    expect(await signUp(userOne)).toThrowError('User is already in database')
  })

  it('should get user', async () => {
    const user = await signUp(userOne)

    expect(user).toEqual(expect.objectContaining({ entryid: user.entityId }))
  })
})
