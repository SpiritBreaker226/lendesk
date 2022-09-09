import { waitFor } from '@testing-library/react'
import axios from 'axios'

import { removeTokenFromServer } from '../removeTokenFromServer'

const mockOnSuccess = jest.fn()
const mockOnError = jest.fn()

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const token = '982374ds'
let mockGetToken: string = token

jest.mock('../../../../helpers', () => ({
  ...jest.requireActual('../../../../helpers'),
  getToken: () => mockGetToken,
}))

describe('removeTokenFromServer', () => {
  beforeEach(() => {
    mockGetToken = token
  })

  it('should call onSuccess when complated', async () => {
    mockedAxios.post.mockResolvedValue({})

    await removeTokenFromServer(mockOnSuccess, mockOnError)

    await waitFor(() => {
      expect(mockOnSuccess).toBeCalled()
    })
  })

  it('should call onError on error', async () => {
    mockedAxios.post.mockRejectedValue(new Error('fake error message'))

    await removeTokenFromServer(mockOnSuccess, mockOnError)

    await waitFor(() => {
      expect(mockOnError).toBeCalled()
    })
  })
})
