import factory from '@adonisjs/lucid/factories'
import Location from '#models/location'
import { ViewingFactory } from '#database/factories/viewing_factory'
import { UserFactory } from './user_factory.js'

export const LocationFactory = factory
  .define(Location, async ({ faker }) => {
    return {
      name: faker.location.city(),
    }
  })
  .relation('viewings', () => ViewingFactory)
  .relation('user', () => UserFactory)
  .build()
