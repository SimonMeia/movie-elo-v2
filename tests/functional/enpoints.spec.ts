import { test } from '@japa/runner'

test.group('Endpoints', () => {
  test('cannot access the application without logging in', async ({ client }) => {
    const response = await client.get('/app').withInertia()
    response.assertInertiaComponent('auth/main')
  })

  test('can access homepage', async ({ client }) => {
    const response = await client.get('/').withInertia()
    console.log(response.inertiaComponent)
    response.assertInertiaComponent('landing/main')
  })

  test('can access login page', async ({ client }) => {
    const response = await client.get('/app/auth').withInertia()
    response.assertInertiaComponent('auth/main')
  })
})
