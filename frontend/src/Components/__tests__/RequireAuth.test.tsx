import { screen } from '@testing-library/react'

import { render } from '../../testUtil'
import { RequireAuth } from '../RequireAuth'

const mockNavigate = jest.fn()
const mockRoute = jest.fn()
let mockIsAuth: boolean = false

jest.mock('../../helpers', () => ({
  ...jest.requireActual('../../helpers'),
  isAuth: () => mockIsAuth,
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => mockNavigate,
  Route: () => mockRoute,
}))

describe('RequireAuth', () => {
  beforeEach(() => {
    mockIsAuth = false
  })

  it('should submit a valid form', async () => {
    mockIsAuth = true

    render(<RequireAuth>Profile</RequireAuth>)

    await screen.findByText('Profile')
  })

  describe('when user is not authicated', () => {
    it('should redirect to the login', async () => {
      render(<RequireAuth>Profile</RequireAuth>)

      expect(screen.queryByText('Profile')).not.toBeInTheDocument()
    })
  })
})
