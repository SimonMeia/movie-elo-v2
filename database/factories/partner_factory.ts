import factory from '@adonisjs/lucid/factories'
import Partner from '#models/partner'
import { ViewingFactory } from '#database/factories/viewing_factory'

export const PartnerFactory = factory
  .define(Partner, async ({ faker }) => {
    return {
      name: faker.person.firstName(),
    }
  })
  .relation('viewings', () => ViewingFactory)
  .build()
