import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { createReviewValidator } from '#validators/review'
import { ReviewResponse } from '../../types/response.js'
import MovieService from '#services/movie_service'
import Review from '#models/review'
import ReviewService from '#services/reviews_sevice'

export default class ReviewsController {
  @inject()
  async index({ inertia }: HttpContext) {
    console.log('index')
    return inertia.render<{}>('review/main', {})
  }

  @inject()
  async create({ inertia, request }: HttpContext) {
    console.log('create')
    request.csrfToken
    return inertia.render<{}>('review_form/main', { csrfToken: request.csrfToken })
  }

  @inject()
  async store({ request, response }: HttpContext) {
    console.log('store')
    const payload = await createReviewValidator.validate(request.all())

    // 1. Check si le film existe, sinon le créer
    const movie = await MovieService.createIfNotExists(payload.tmdbMovieId)

    // 2. Créer un viewing pour le film, créer des locations et des partners si necessaire

    // 3. Créer la review et link le film et le viewing
    const review = await Review.create({
      userId: 1,
      acting: payload.grades.acting,
      story: payload.grades.story,
      music: payload.grades.music,
      directing: payload.grades.directing,
      feeling: payload.grades.feeling,
      personal: payload.grades.personal,
      comment: payload.comment,
      movieId: movie.id,
    })

    // 4. Rediriger vers la page du film

    return response.redirect().toRoute('reviews.show', { id: review.id })
  }

  @inject()
  async show({ inertia, params }: HttpContext) {
    console.log('show')
    console.log(params.id)
    const responseData: ReviewResponse = await ReviewService.getReviewResponse(params.id, 1)

    return inertia.render<ReviewResponse>('review/main', responseData)
  }
}
