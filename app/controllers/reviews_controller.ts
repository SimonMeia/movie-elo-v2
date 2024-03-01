import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { createReviewValidator } from '#validators/review'
import { ReviewFormResponse, ReviewResponse, ReviewsResponse } from '#types/response'
import MovieService from '#services/movie_service'
import Review from '#models/review'
import ReviewService from '#services/reviews_sevice'
import ViewingService from '#services/viewing_service'
import Location from '#models/location'
import Partner from '#models/partner'
import Grade from '#models/grade'
import GradeType from '#models/grade_type'

export default class ReviewsController {
  @inject()
  async index({ inertia, auth }: HttpContext) {
    const user = auth.user!
    const reviews = await ReviewService.getAllReviews(user.id)
    return inertia.render<ReviewsResponse>('reviews/main', reviews)
  }

  @inject()
  async create({ inertia, request, auth }: HttpContext) {
    const user = auth.user!

    const locations = await Location.query().where('userId', user.id)
    const partners = await Partner.query().where('userId', user.id)
    const gradesTypes = await GradeType.query().where('user_id', user.id)

    return inertia.render<ReviewFormResponse>('review_form/main', {
      homeTmdbMovieId: request.input('homeTmdbMovieId'),
      homeTmdbMovieTitle: request.input('homeTmdbMovieTitle'),
      dbLocations: locations.map((l) => l.name),
      dbPartners: partners.map((p) => p.name),
      dbGradeTypes: gradesTypes.map((g) => ({
        id: g.id,
        name: g.name,
        maxGrade: g.maxGrade,
      })),
    })
  }

  @inject()
  async store({ request, response, auth }: HttpContext) {
    const user = auth.user!

    const payload = await createReviewValidator.validate(request.all(), {
      meta: {
        userId: user.id,
      },
    })

    // 1. Check si le film existe, sinon le créer
    const movie = await MovieService.createIfNotExists(payload.tmdbMovieId)

    // 2. Créer la review et link le film
    const review = await Review.create({
      userId: user.id,
      comment: payload.comment,
      movieId: movie.id,
    })

    //3. Créer les notes
    await Grade.createMany(
      payload.grades.map((g) => ({
        reviewId: review.id,
        gradeTypeId: g.gradeTypeId,
        grade: g.grade,
      }))
    )

    // 4. Créer un viewing pour le film, créer des locations et des partners si necessaire
    await ViewingService.createViewing(
      user.id,
      payload.date,
      review.id,
      payload.locations,
      payload.partners
    )

    // 5. Rediriger vers la page du film
    return response.redirect().toRoute('reviews.show', { id: review.id })
  }

  @inject()
  async show({ inertia, params, auth }: HttpContext) {
    const user = auth.user!
    const responseData: ReviewResponse = await ReviewService.getReview(params.id, user.id)

    return inertia.render<ReviewResponse>('review/main', responseData)
  }
}
