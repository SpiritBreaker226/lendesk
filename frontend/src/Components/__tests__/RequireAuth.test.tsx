import { screen } from '@testing-library/react'

import { AuthProvider, render, user } from '../../testUtil'
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

    render(
      <AuthProvider state={{ user }}>
        <RequireAuth>Profile</RequireAuth>
      </AuthProvider>
    )

    await screen.findByText('Profile')
  })

  describe('when user is not authicated', () => {
    it('should redirect to the login', async () => {
      render(
        <AuthProvider state={{ user: null }}>
          <RequireAuth>Profile</RequireAuth>
        </AuthProvider>
      )

      expect(screen.queryByText('Profile')).not.toBeInTheDocument()
    })
  })
})
