import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import userRouter from './routers/user'
import { dbClient } from './db'

const app = express()

dotenv.config()

const port = process.env.PORT || 4000

app.use(express.json())

app.use(cors())

app.use(userRouter)

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

app.removeListener('connection', () => {
  const closeDb = async () => await dbClient.close()

  closeDb()
})

export default app
