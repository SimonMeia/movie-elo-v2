import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { ReviewFactory } from '#database/factories/review_factory'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })
  .relation('reviews', () => ReviewFactory)
  .build()
