import factory from '@adonisjs/lucid/factories'
import Review from '#models/review'
import { MovieFactory } from '#database/factories/movie_factory'
import { UserFactory } from '#database/factories/user_factory'
import { ViewingFactory } from '#database/factories/viewing_factory'

export const ReviewFactory = factory
  .define(Review, async ({ faker }) => {
    return {
      story: faker.number.int({ min: 1, max: 5 }),
      acting: faker.number.int({ min: 1, max: 3 }),
      music: faker.number.int({ min: 1, max: 3 }),
      directing: faker.number.int({ min: 1, max: 3 }),
      feeling: faker.number.int({ min: 1, max: 2 }),
      personal: faker.number.int({ min: 1, max: 4 }),
      comment: faker.lorem.sentence(),
    }
  })
  .relation('movie', () => MovieFactory)
  .relation('user', () => UserFactory)
  .relation('viewngs', () => ViewingFactory)
  .build()
