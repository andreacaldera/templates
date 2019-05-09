import request from 'supertest'
import { testFullApp } from '../factories/app'

describe('/', () => {
  it.skip('requires authentication', async () => {
    const app = testFullApp()
    await request(app)
      .get('/')
      .set('X-user-details', '')
      .expect(302)
  })
})
