import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import Review from '#models/review'

export default class CanAccessReviewMiddleware {
  async handle({ params, auth, response }: HttpContext, next: NextFn) {
    const user = auth.user
    if (!user) return response.redirect('/auth')

    if (!params.id) return response.redirect().toRoute('reviews.index')

    const review = await Review.query().where('id', params.id).where('user_id', user.id).first()

    if (!review) return response.redirect().toRoute('reviews.index')

    return next()
  }
}
