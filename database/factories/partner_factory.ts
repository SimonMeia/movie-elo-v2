import factory from '@adonisjs/lucid/factories'
import Partner from '#models/partner'
import { ViewingFactory } from '#database/factories/viewing_factory'
import { UserFactory } from './user_factory.js'

export const PartnerFactory = factory
  .define(Partner, async ({ faker }) => {
    return {
      name: faker.person.firstName(),
    }
  })
  .relation('viewings', () => ViewingFactory)
  .relation('user', () => UserFactory)
  .build()
