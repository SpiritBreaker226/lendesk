import { setupDatabase } from './testUtils'

beforeEach(() => {
  const setupTests = async () => {
    await setupDatabase()
  }

  setupTests()
})
