import type { HttpContext } from '@adonisjs/core/http'
import { ReviewsResponse } from '#types/response'
import ReviewService from '#services/reviews_sevice'
import { inject } from '@adonisjs/core'

export default class HomeController {
  @inject()
  async index({ inertia, auth }: HttpContext) {
    const user = auth.user!

    const reviews = await ReviewService.getLastReviews(user.id, 3)

    return inertia.render<ReviewsResponse>('home/main', reviews)
  }
}
