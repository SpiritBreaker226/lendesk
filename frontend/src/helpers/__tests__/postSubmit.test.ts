import axios from 'axios'

import { user } from '../../testUtil'
import { ApiNamespace, ApiPath } from '../../Types'
import postSubmit from '../postSubmit'

const mockOnSuccess = jest.fn()
const mockOnError = jest.fn()

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('postSubmit', () => {
  describe('when request is success', () => {
    it('should call mockOnSuccess', async () => {
      mockedAxios.post.mockResolvedValue({})

      await postSubmit(
        ApiPath.signup,
        ApiNamespace.users,
        user,
        mockOnSuccess,
        mockOnError
      )

      expect(mockOnSuccess).toBeCalled()
      expect(mockOnError).not.toBeCalled()
    })
  })

  describe('when request has an error', () => {
    it('should display form error', async () => {
      mockedAxios.post.mockRejectedValue(new Error('fake error message'))

      await postSubmit(
        ApiPath.signup,
        ApiNamespace.users,
        user,
        mockOnSuccess,
        mockOnError
      )

      expect(mockOnSuccess).not.toBeCalled()
      expect(mockOnError).toBeCalledWith({
        field: undefined,
        errorMessage: 'fake error message',
      })
    })

    it('should display field error', async () => {
      mockedAxios.post.mockRejectedValue(
        new Error('email: fake email error message')
      )

      await postSubmit(
        ApiPath.signup,
        ApiNamespace.users,
        user,
        mockOnSuccess,
        mockOnError
      )

      expect(mockOnSuccess).not.toBeCalled()
      expect(mockOnError).toBeCalledWith({
        field: 'email',
        errorMessage: 'fake email error message',
      })
    })
  })
})
