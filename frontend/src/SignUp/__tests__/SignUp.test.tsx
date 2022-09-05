import { fireEvent, screen, waitFor } from '@testing-library/react'
import axios from 'axios'

import { render } from '../../testUtil'
import { SignUp } from '../SignUp'

// TODO: IF have time look into if mocking postSubmit is possible so to isloate
// it form the componets

const mockUseNavigate = jest.fn()

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}))

describe('SignUp', () => {
  const setUp = () => render(<SignUp />)
  const fillForm = () => {
    fireEvent.change(screen.getByRole('textbox', { name: 'First Name' }), {
      target: { value: 'Billy' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Last Name' }), {
      target: { value: 'Bob' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'bbob@noemail.com' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '1Qd*189327' },
    })
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: '1Qd*189327' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }))
  }

  it('should submit a valid form', async () => {
    mockedAxios.post.mockResolvedValue({ status: 201 })

    setUp()

    fillForm()

    expect(screen.getByRole('textbox', { name: 'First Name' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Last Name' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeDisabled()
    expect(screen.getByLabelText('Password')).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeDisabled()

    await waitFor(() =>
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/signup'),
        {
          firstName: 'Billy',
          lastName: 'Bob',
          email: 'bbob@noemail.com',
          password: '1Qd*189327',
          confirmPassword: '1Qd*189327',
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
})
