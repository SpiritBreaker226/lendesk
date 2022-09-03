import express from 'express'

const app = express()

const port = process.env.PORT || 4000

app.use(express.json())

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

export default app
