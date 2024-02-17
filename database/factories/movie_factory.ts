import factory from '@adonisjs/lucid/factories'
import Movie from '#models/movie'
import { DateTime } from 'luxon'
import { ReviewFactory } from '#database/factories/review_factory'
import { MoviePersonFactory } from '#database/factories/movie_person_factory'
import { CountryFactory } from '#database/factories/country_factory'
import { GenreFactory } from '#database/factories/genre_factory'

export const MovieFactory = factory
  .define(Movie, async ({ faker }) => {
    return {
      title: faker.music.songName(),
      tmdbId: faker.number.int({ min: 1, max: 1000 }),
      synopsis: faker.lorem.sentence(),
      releaseDate: DateTime.fromJSDate(faker.date.past()),
      runtime: faker.number.int({ min: 60, max: 240 }),
      posterPath: faker.image.url(),
      backdropPath: faker.image.url(),
    }
  })
  .relation('reviews', () => ReviewFactory)
  .relation('actors', () => MoviePersonFactory)
  .relation('directors', () => MoviePersonFactory)
  .relation('composers', () => MoviePersonFactory)
  .relation('countries', () => CountryFactory)
  .relation('genres', () => GenreFactory)
  .build()
