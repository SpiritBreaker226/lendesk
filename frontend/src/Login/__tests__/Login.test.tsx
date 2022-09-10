import { fireEvent, screen, waitFor } from '@testing-library/react'
import axios from 'axios'

import { AuthProvider, render, user } from '../../testUtil'
import { Login } from '../Login'

// TODO: IF have time look into if mocking postSubmit is possible so to isloate
// it form the componets

const mockUseNavigate = jest.fn()
const mockNavigate = jest.fn()
const mockLogin = jest.fn()
let mockIsAuth: boolean

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
  Navigate: () => mockNavigate,
}))

jest.mock('../../helpers', () => ({
  ...jest.requireActual('../../helpers'),
  isAuth: () => mockIsAuth,
  login: () => mockLogin,
}))

describe('login', () => {
  const setUp = () => render(<Login />)
  const fillForm = () => {
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'bbob@noemail.com' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '1Qd*189327' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Login' }))
  }

  beforeEach(() => {
    mockIsAuth = false
  })

  it('should submit a valid form', async () => {
    mockedAxios.post.mockResolvedValue({ status: 201 })

    setUp()

    fillForm()

    expect(screen.getByRole('textbox', { name: 'Email' })).toBeDisabled()
    expect(screen.getByLabelText('Password')).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Login' })).toBeDisabled()

    await waitFor(() =>
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/login'),
        {
          email: 'bbob@noemail.com',
          password: '1Qd*189327',
        }
      )
    )
  })

  it('should display error from server', async () => {
    mockedAxios.post.mockRejectedValue(new Error('fake error message'))

    setUp()

    fillForm()

    await waitFor(() => expect(mockUseNavigate).not.toBeCalled())
    await screen.findByText(/fake error message/i)
  })

  it('should display error from server for a field', async () => {
    mockedAxios.post.mockRejectedValue(
      new Error('email: fake email error message')
    )

    setUp()

    fillForm()

    await screen.findByText(/fake email error message/i)
  })

  describe('when user is already login', () => {
    it('should redirect to the profile', async () => {
      mockIsAuth = true

      render(
        <AuthProvider state={{ user }}>
          <Login />
        </AuthProvider>
      )

      expect(screen.queryByText('Create account')).not.toBeInTheDocument()
    })
  })
})
