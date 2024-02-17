import factory from '@adonisjs/lucid/factories'
import Location from '#models/location'
import { ViewingFactory } from '#database/factories/viewing_factory'

export const LocationFactory = factory
  .define(Location, async ({ faker }) => {
    return {
      name: faker.location.city(),
    }
  })
  .relation('viewings', () => ViewingFactory)
  .build()
