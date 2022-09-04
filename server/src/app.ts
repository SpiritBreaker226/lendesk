import express from 'express'

import { dbClient } from './db'

const app = express()

const port = process.env.PORT || 4000

app.use(express.json())

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

app.removeListener('connection', () => {
  const closeDb = async () => await dbClient.close()

  closeDb()
})

export default app
