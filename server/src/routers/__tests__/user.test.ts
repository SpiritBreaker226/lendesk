import request from 'supertest'
import { faker } from '@faker-js/faker'

import app from '../../app'
import { findById, isExistingUser } from '../../models'
import { createUser, userOne } from '../../testUtils'
import { User } from '../../types'

const mockAuth = jest.fn()
const mockValidateUser = jest.fn()

jest.mock('../../middleware', () => ({
  ...jest.requireActual('../../middleware'),
  auth: () => mockAuth,
  mockValidateUser: () => mockValidateUser,
}))

describe('/user', () => {
  describe('POST /signup', () => {
    it.skip('should signup a new user', async () => {
      const userInfo: Omit<User, 'password' | 'tokens'> = {
        firstName: 'Jason',
        lastName: 'Stathopulos',
        email: 'jason@example.com',
      }
      const password = faker.internet.password()

      const res = await request(app)
        .post('/users/signup')
        .send({ ...userInfo, password })
        .expect(201)

      // Assert that the database was changed correctly
      const user = await findById(res.body.user._id)
      expect(user).not.toBeNull()

      // Assertions about the response
      expect(res.body).toMatchObject({
        user: { ...userInfo },
        token: user.tokens[0],
      })

      expect(user.password).not.toBe(password)
    })

    it.skip('should not signup user with invalid name/email/password', async () => {
      const userInfo: Omit<User, 'tokens'> = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: '123',
      }

      await request(app)
        .post('/users/signup')
        .send({ ...userInfo })
        .expect(400)

      const user = await isExistingUser(userInfo.email)

      expect(user).toBeNull()
    })

    it.skip('should not signup user if user already exist', async () => {
      await createUser(userOne)

      await request(app)
        .post('/users/signup')
        .send({ ...userOne })
        .expect(400)
    })
  })

  describe('POST /login', () => {
    it.skip('should login existing user', async () => {
      await createUser(userOne)

      const res = await request(app)
        .post('/users/login')
        .send({
          email: userOne.email,
          password: userOne.password,
        })
        .expect(200)

      const user = await findById(res.body.user._id)

      expect(user).not.toBeNull()
      expect(res.body.token).toBe(user.tokens[1])
    })

    it.skip('should not login nonexistent user', async () => {
      await request(app)
        .post('/users/login')
        .send({
          email: faker.internet.email(),
          password: faker.internet.password(),
        })
        .expect(400)
    })
  })

  describe('POST /logout', () => {
    it.skip('should logout existing user', async () => {
      await createUser(userOne)

      const res = await request(app).post('/users/logout').expect(200)

      const user = await findById(res.body.user._id)

      expect(user).not.toBeNull()
      expect(user.tokens.length).toBe(0)
    })

    it.skip('should not logout nonexistent user', async () => {
      await request(app).post('/users/logout').expect(500)
    })
  })

  describe('GET /profile', () => {
    it.skip('should get profile for user', async () => {
      const user = await createUser(userOne)

      await request(app)
        .get(`/users/${user.entityId}`)
        .set('Authorization', `Bearer ${userOne.tokens[0]}`)
        .send()
        .expect(200)
    })

    it.skip('should not get profile for unauthorizcated user', async () => {
      const user = await createUser({ ...userOne, tokens: [] })

      await request(app).get(`/users/${user.entityId}`).send().expect(401)
    })
  })
})
