import { Client } from 'redis-om'

export const dbClient = new Client()

const redisClient = async () => {
  console.log('Connecting to the Redis')

  try {
    if (!dbClient.isOpen()) {
      await dbClient.open(process.env.DB_URL)

      console.log('Connected!')
    }
  } catch (error) {
    console.log('Error in the Connection')
  }
}

redisClient()
