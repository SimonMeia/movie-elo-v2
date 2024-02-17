import factory from '@adonisjs/lucid/factories'
import Country from '#models/country'
import { MovieFactory } from '#database/factories/movie_factory'

export const CountryFactory = factory
  .define(Country, async ({ faker }) => {
    return {
      name: faker.location.country(),
      iso3166_1: faker.location.countryCode(),
    }
  })
  .relation('movies', () => MovieFactory)
  .build()
