import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { createReviewValidator } from '#validators/review'
import { ReviewResponse } from '../../types/response.js'
import { Review } from '../../types/review.js'

export default class ReviewsController {
  @inject()
  async index(ctx: HttpContext) {
    console.log('index')
    return ctx.inertia.render<{}>('review/main', {})
  }

  @inject()
  async create(ctx: HttpContext) {
    console.log('create')
    ctx.request.csrfToken
    return ctx.inertia.render<{}>('review_form/main', { csrfToken: ctx.request.csrfToken })
  }

  @inject()
  async store(ctx: HttpContext) {
    console.log('store')
    const payload: Review = await createReviewValidator.validate(ctx.request.all())
    const response: ReviewResponse = {
      review: payload,
    }
    return ctx.inertia.render<ReviewResponse>('review/main', response)
  }
}
