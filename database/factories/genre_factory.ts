import factory from '@adonisjs/lucid/factories'
import Genre from '#models/genre'
import { MovieFactory } from '#database/factories/movie_factory'

export const GenreFactory = factory
  .define(Genre, async ({ faker }) => {
    return {
      name: faker.music.genre(),
      tmdbId: faker.number.int({ min: 1, max: 1000 }),
    }
  })
  .relation('movies', () => MovieFactory)
  .build()
