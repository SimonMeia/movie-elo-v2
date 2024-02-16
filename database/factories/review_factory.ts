import factory from '@adonisjs/lucid/factories'
import Review from '#models/review'

export const ReviewFactory = factory
  .define(Review, async ({ faker }) => {
    return {}
  })
  .build()
