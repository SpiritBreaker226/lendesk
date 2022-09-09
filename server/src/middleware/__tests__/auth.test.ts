import { NextFunction, Response } from 'express'
import { faker } from '@faker-js/faker'

import { createUser, userOne } from '../../testUtils'
import { AuthRequest } from '../../types'

import { auth } from '../auth'

const nextFunction: NextFunction = jest.fn()
let mockRequest: Partial<AuthRequest>
let mockResponse: Partial<Response>

describe('auth', () => {
  beforeEach(() => {
    mockRequest = {}
    mockResponse = {
      json: jest.fn(),
    }
  })

  it('should not work without headers', async () => {
    auth(mockRequest as AuthRequest, mockResponse as Response, nextFunction)

    expect(mockResponse.json).toBeCalledWith({
      error: 'Please authenticate.',
    })
  })

  it('should not work without "authorization" header', async () => {
    mockRequest = {
      headers: {},
    }

    auth(mockRequest as AuthRequest, mockResponse as Response, nextFunction)

    expect(mockResponse.json).toBeCalledWith({
      error: 'Please authenticate.',
    })
  })

  it('should work with "authorization" header', async () => {
    const user = await createUser({
      ...userOne,
      tokens: [faker.git.shortSha()],
    })

    mockRequest = {
      headers: {
        authorization: `Bearer ${user.tokens[0]}`,
      },
    }

    auth(mockRequest as AuthRequest, mockResponse as Response, nextFunction)

    expect(nextFunction).toBeCalledTimes(1)
  })
})
