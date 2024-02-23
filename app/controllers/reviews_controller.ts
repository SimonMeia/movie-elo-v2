import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { createReviewValidator } from '#validators/review'
import { ReviewResponse, ReviewsResponse } from '../../types/response.js'
import MovieService from '#services/movie_service'
import Review from '#models/review'
import ReviewService from '#services/reviews_sevice'
import ViewingService from '#services/viewing_service'
import Location from '#models/location'
import Partner from '#models/partner'

export default class ReviewsController {
  @inject()
  async index({ inertia }: HttpContext) {
    const reviews = await ReviewService.getReviewsResponse(1)
    return inertia.render<ReviewsResponse>('reviews/main', reviews)
  }

  @inject()
  async create({ inertia, request }: HttpContext) {
    console.log('create')
    const locations = await Location.query().where('userId', 1)
    const partners = await Partner.query().where('userId', 1)

    return inertia.render<{}>('review_form/main', {
      csrfToken: request.csrfToken,
      dbLocations: locations.map((l) => l.name),
      dbPartners: partners.map((p) => p.name),
    })
  }

  @inject()
  async store({ request, response }: HttpContext) {
    console.log('store')
    const payload = await createReviewValidator.validate(request.all())

    // 1. Check si le film existe, sinon le créer
    const movie = await MovieService.createIfNotExists(payload.tmdbMovieId)

    // 2. Créer la review et link le film
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

    // 3. Créer un viewing pour le film, créer des locations et des partners si necessaire
    await ViewingService.createViewing(
      1,
      payload.date,
      review.id,
      payload.locations,
      payload.partners
    )

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
