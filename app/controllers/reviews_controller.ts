import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { createReviewValidator } from '#validators/review'
import { ReviewResponse, ReviewsResponse } from '#types/response'
import MovieService from '#services/movie_service'
import Review from '#models/review'
import ReviewService from '#services/reviews_sevice'
import ViewingService from '#services/viewing_service'
import Location from '#models/location'
import Partner from '#models/partner'

export default class ReviewsController {
  @inject()
  async index({ inertia, auth }: HttpContext) {
    const user = auth.user!
    console.log(user)
    const reviews = await ReviewService.getAllReviews(user.id)
    return inertia.render<ReviewsResponse>('reviews/main', reviews)
  }

  @inject()
  async create({ inertia, request, auth }: HttpContext) {
    const user = auth.user!

    const locations = await Location.query().where('userId', user.id)
    const partners = await Partner.query().where('userId', user.id)

    return inertia.render<{}>('review_form/main', {
      homeTmdbMovieId: request.input('homeTmdbMovieId'),
      homeTmdbMovieTitle: request.input('homeTmdbMovieTitle'),
      dbLocations: locations.map((l) => l.name),
      dbPartners: partners.map((p) => p.name),
    })
  }

  @inject()
  async store({ request, response, auth }: HttpContext) {
    const payload = await createReviewValidator.validate(request.all())

    const user = auth.user!

    // 1. Check si le film existe, sinon le créer
    const movie = await MovieService.createIfNotExists(payload.tmdbMovieId)

    // 2. Créer la review et link le film
    const review = await Review.create({
      userId: user.id,
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
      user.id,
      payload.date,
      review.id,
      payload.locations,
      payload.partners
    )

    // 4. Rediriger vers la page du film
    return response.redirect().toRoute('reviews.show', { id: review.id })
  }

  @inject()
  async show({ inertia, params, auth }: HttpContext) {
    const user = auth.user!
    const responseData: ReviewResponse = await ReviewService.getReview(params.id, user.id)

    return inertia.render<ReviewResponse>('review/main', responseData)
  }
}
