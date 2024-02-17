import factory from '@adonisjs/lucid/factories'
import MoviePerson from '#models/movie_person'
import { MovieFactory } from '#database/factories/movie_factory'

export const MoviePersonFactory = factory
  .define(MoviePerson, async ({ faker }) => {
    return {
      tmdbId: faker.number.int({ min: 1, max: 1000 }),
      name: faker.person.fullName(),
      profilePath: faker.image.avatar(),
    }
  })
  .relation('movies', () => MovieFactory)
  .build()
