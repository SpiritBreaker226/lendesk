import express from 'express'

import { auth, userValidateSchema, validateSchema } from '../middleware'
import {
  findByCredentials,
  findById,
  generateAuthToken,
  logout,
  signUp,
} from '../models'
import { AuthRequest } from '../types'

const userRouter = express.Router()

userRouter.post(
  '/users/signup',
  userValidateSchema,
  validateSchema,
  async (req, res) => {
    try {
      const user = await signUp({ ...req.body })
      const token = await generateAuthToken(user)

      res.status(201).send({ user, token })
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
)

userRouter.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await findByCredentials(email, password)
    const token = await generateAuthToken(user)

    res.send({ user, token })
  } catch (error) {
    res.status(401).send(error.message)
  }
})

userRouter.post('/users/logout', auth, async (req: AuthRequest, res) => {
  try {
    await logout(req.user, req.token)

    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

userRouter.get('/users/:id', auth, async (req, res) => {
  try {
    const user = await findById(req.params.id)

    if (user) {
      return res.send({ user })
    }

    throw new Error()
  } catch (error) {
    res.status(404).send()
  }
})

export default userRouter
