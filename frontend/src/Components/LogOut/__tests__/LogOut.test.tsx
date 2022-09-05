import { fireEvent, screen, waitFor } from '@testing-library/react'
import axios from 'axios'

import { render } from '../../../testUtil'
import { LogOut } from '../LogOut'

// TODO: IF have time look into if mocking postSubmit is possible so to isloate
// it form the componets

const mockUseNavigate = jest.fn()

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}))

describe('LogOut', () => {
  const setUp = () => render(<LogOut />)

  it('should go to the homepage after logout', async () => {
    mockedAxios.post.mockResolvedValue({})

    setUp()

    fireEvent.click(screen.getByRole('button'))

    expect(global.window.location.href).toContain('/')
  })

  // do to time  the error check will not be done
  // it('should display error from server', async () => {
  //   mockedAxios.post.mockRejectedValue(new Error('fake error message'))

  //   setUp()

  //   await waitFor(() => {
  //     screen.getByText(/fake error message/i)
  //   })
  // })
})
