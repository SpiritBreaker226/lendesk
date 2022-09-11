import { getToken } from '../auth'

describe('auth', () => {
  let originalLocalStorage: Storage

  beforeEach(() => {
    originalLocalStorage = window.localStorage
  })

  afterEach(() => {
    ;(window as any).localStorage = originalLocalStorage
  })

  describe('getToken', () => {
    it('should get user from local stroage', async () => {
      const localStorgeToken = '2345'
      const mockGetItem = jest.fn().mockReturnValue(localStorgeToken)
      const localStorageMock = {
        getItem: (params: string) => mockGetItem(params),
      }

      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true,
      })

      const loginUserToken = getToken()

      expect(mockGetItem.mock.calls.length).toBe(1)
      expect(loginUserToken).toEqual(localStorgeToken)
    })

    describe('when is not in local storage', () => {
      it('should returen throw an error', async () => {
        const mockGetItem = jest.fn().mockReturnValue(null)
        const localStorageMock = {
          getItem: (params: string) => mockGetItem(params),
        }

        Object.defineProperty(window, 'localStorage', {
          value: localStorageMock,
          writable: true,
        })

        expect(getToken).toThrowError()
      })
    })
  })
})
