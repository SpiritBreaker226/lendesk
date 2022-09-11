import { screen } from '@testing-library/react'
import axios from 'axios'

import { AuthProvider, render, user } from '../../testUtil'
import { User } from '../../Types'
import { Profile } from '../Profile'

const mockUseNavigate = jest.fn()

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}))

describe('Profile', () => {
  const setUp = (user: User | null = null) =>
    render(
      <AuthProvider state={{ user }}>
        <Profile />
      </AuthProvider>
    )

  it('should show profile', async () => {
    const mockUser: User = { ...user, firstName: 'Jay', lastName: 'Stats' }

    setUp(mockUser)

    await screen.findByText(/Jay Stats/i)
  })

  it('should display error from server', async () => {
    setUp()

    await screen.findByText(/User not found/i)
  })
})
