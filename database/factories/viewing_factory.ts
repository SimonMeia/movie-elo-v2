import factory from '@adonisjs/lucid/factories'
import Viewing from '#models/viewing'
import { DateTime } from 'luxon'
import { PartnerFactory } from '#database/factories/partner_factory'
import { ReviewFactory } from '#database/factories/review_factory'
import { LocationFactory } from '#database/factories/location_factory'

export const ViewingFactory = factory
  .define(Viewing, async ({ faker }) => {
    return {
      viewingDate: DateTime.fromJSDate(faker.date.recent()),
    }
  })
  .relation('locations', () => LocationFactory)
  .relation('partners', () => PartnerFactory)
  .relation('review', () => ReviewFactory)
  .build()
