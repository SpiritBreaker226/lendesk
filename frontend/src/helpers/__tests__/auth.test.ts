import { user } from '../../testUtil'
import { getUser } from '../auth'

describe('auth', () => {
  describe('getUser', () => {
    beforeEach(() => {
      window.localStorage.clear()
    })

    it('should get user from local stroage', async () => {
      Storage.prototype.getItem = jest.fn(() => JSON.stringify(user))

      const loginUser = getUser()

      expect(loginUser).not.toBeNull()
    })

    describe('when is not in local storage', () => {
      it('should returen null', async () => {
        const loginUser = getUser()

        expect(loginUser).toBeNull()
      })
    })
  })
})
