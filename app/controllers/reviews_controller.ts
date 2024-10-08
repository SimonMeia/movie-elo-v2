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
import grade_service from '#services/grade_service'
import { updateGradesValidator } from '#validators/update_grades'

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

    const comparisonGrades = await grade_service.getMovieForEachGrade(user.id)

    const locations = await Location.query()
      .where('userId', user.id)
      .distinct('name')
      .orderBy('name', 'asc')
    const partners = await Partner.query()
      .where('userId', user.id)
      .distinct('name')
      .orderBy('name', 'asc')
    const gradesTypes = await GradeType.query().where('user_id', user.id).preload('grades')

    return inertia.render<ReviewFormResponse>('review_form/main', {
      homeTmdbMovieId: request.input('homeTmdbMovieId'),
      homeTmdbMovieTitle: request.input('homeTmdbMovieTitle'),
      dbLocations: locations.map((location) => location.name),
      dbPartners: partners.map((partner) => partner.name),
      dbGradeTypes: gradesTypes.map((type) => ({
        id: type.id,
        name: type.name,
        maxGrade: type.maxGrade,
        grades: type.grades
          .map((grade) => ({
            id: grade.id,
            description: grade.description,
            grade: grade.value,
            movie:
              comparisonGrades.find((c) => c.id === type.id)?.grades.find((g) => g.id === grade.id)
                ?.movie || 'Pas de film',
          }))
          .sort((a, b) => b.grade - a.grade),
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

    //3. Ajouter les notes
    const gradesIdPromises = payload.grades.map(async (payloadGrade) => {
      const grade = await Grade.query()
        .where('grade_type_id', payloadGrade.gradeTypeId)
        .where('value', payloadGrade.grade)
        .firstOrFail()
      return grade.id
    })

    const gradesId = await Promise.all(gradesIdPromises)

    await review.related('grades').attach(gradesId)

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

    const dbLocations = await Location.query()
      .where('userId', user.id)
      .distinct('name')
      .orderBy('name', 'asc')
      .select('name')

    const dbPartners = await Partner.query()
      .where('userId', user.id)
      .distinct('name')
      .orderBy('name', 'asc')
      .select('name')

    const locationNames = dbLocations.map((location) => location.name)
    const partnerNames = dbPartners.map((partner) => partner.name)

    return inertia.render<{ review: ReviewResponse; dbLocations: string[]; dbPartners: string[] }>(
      'review/main',
      { review: responseData, dbLocations: locationNames, dbPartners: partnerNames }
    )
  }

  @inject()
  async updateGrades({ request, response, params }: HttpContext) {
    const review = await Review.findOrFail(params.id)
    const payload = await updateGradesValidator.validate(request.all())

    const grades = await review.related('grades').query()

    for (const grade of grades) {
      grade.value = payload.grades.find((g) => g.gradeTypeId === grade.gradeTypeId)!.grade
      grade.save()
    }

    return response.redirect().toRoute('reviews.show', { id: review.id })
  }
}
