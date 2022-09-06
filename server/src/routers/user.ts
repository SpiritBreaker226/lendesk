import express from 'express'

import { auth } from '../middleware'
import { generateAuthToken, User, userRepository } from '../models'

const userRouter = express.Router()

userRouter.post('/signup', async (req, res) => {
  try {
    const existingUser = await userRepository
      .search()
      .where('email')
      .eq(req.body.email)
      .returnFirst()

    if (!existingUser) {
      console.log('existingUser', existingUser)
      new Error('User is already in database')
    }

    const user = await User.signUp(req.body)
    console.log('user', user)
    const token = await generateAuthToken(user)

    res.status(201).send({ user, token })
  } catch (error) {
    console.log('error', error)
    res.status(401).send(error)
  }
})

userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findByCredentials(email, password)
    const token = await generateAuthToken(user)

    res.send({ user, token })
  } catch (error) {
    res.status(401).send()
  }
})

userRouter.get('/profile/:id', auth, async (req, res) => {
  try {
    const user = await userRepository.fetch(req.params.id)

    if (user) {
      return res.send({ user })
    }

    throw new Error()
  } catch (error) {
    res.status(404).send()
  }
})

export default userRouter
