import ReviewService from '#services/reviews_sevice'
import { ReviewCard } from '#types/response'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  @inject()
  async index({ inertia, auth }: HttpContext) {
    const user = auth.user!

    const reviews = await ReviewService.getLastReviews(user.id, 3)

    return inertia.render<{ lastReviews: ReviewCard[] }>('home/index', { lastReviews: reviews })
  }
}
