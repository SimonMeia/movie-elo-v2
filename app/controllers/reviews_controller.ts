import Grade from '#models/grade'
import GradeType from '#models/grade_type'
import Location from '#models/location'
import Partner from '#models/partner'
import Review from '#models/review'
import GradeService from '#services/grade_service'
import MovieService from '#services/movie_service'
import ReviewService from '#services/reviews_sevice'
import ViewingService from '#services/viewing_service'
import { PaginationMeta } from '#types/pagination'
import {
  FormGradeType,
  GradedReview,
  ReviewFormResponse,
  ReviewResponse,
  ViewingWithMovieTitle,
} from '#types/response'
import { createReviewValidator } from '#validators/review'
import { updateGradesValidator } from '#validators/update_grades'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class ReviewsController {
  @inject()
  async index({ inertia, auth, request }: HttpContext) {
    const user = auth.user!

    const page = request.qs().page
    let tab = request.qs().tab as string
    if (!['grades', 'viewings'].includes(tab)) tab = 'grades'

    const searchQuery = request.qs().searchQuery

    let sortField = request.qs().sortField
    if (sortField === 'null') sortField = null
    let sortOrder = request.qs().sortOrder
    if (sortOrder !== 'asc' && sortOrder !== 'desc') sortOrder = 'desc'

    let gradesTabData: GradedReview[] = []
    let viewingsTabData: ViewingWithMovieTitle[] = []
    let meta: PaginationMeta

    if (tab === 'viewings') {
      const { data, meta: m } = await ReviewService.getReviewsSortedByViewing(
        user.id,
        page,
        20,
        searchQuery,
        sortField,
        sortOrder
      )
      viewingsTabData = data
      meta = m
    } else {
      const { data, meta: m } = await ReviewService.getReviewsSortedByGrade(
        user.id,
        page,
        20,
        searchQuery,
        sortField,
        sortOrder
      )
      gradesTabData = data
      meta = m
    }

    return inertia.render<{
      meta: PaginationMeta
      gradesTabData: GradedReview[]
      viewingsTabData: ViewingWithMovieTitle[]
      tab: string
      searchQuery: string
      sortField: string
      sortOrder: string
    }>('reviews/index', {
      viewingsTabData: inertia.merge(() => viewingsTabData) as unknown as ViewingWithMovieTitle[], // Pas propre mais fonctionne pour le moment
      gradesTabData: inertia.merge(() => gradesTabData) as unknown as GradedReview[],
      meta: meta,
      tab: tab,
      searchQuery: searchQuery ?? '',
      sortField: sortField ?? '',
      sortOrder: sortOrder ?? '',
    })
  }

  @inject()
  async create({ inertia, request, auth }: HttpContext) {
    const user = auth.user!

    const comparisonGrades = await GradeService.getMovieForEachGrade(user.id)

    const locations = await Location.query()
      .where('userId', user.id)
      .distinct('name')
      .orderBy('name', 'asc')
    const partners = await Partner.query()
      .where('userId', user.id)
      .distinct('name')
      .orderBy('name', 'asc')
    const gradesTypes = await GradeType.query().where('user_id', user.id).preload('grades')

    return inertia.render<ReviewFormResponse>('reviews/create', {
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
  async store({ request, response, auth, session }: HttpContext) {
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
    session.flash('notification', {
      type: 'success',
      message: 'La review a bien été ajoutée !',
    })

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

    const comparisonGrades = await GradeService.getMovieForEachGrade(user.id)
    const locationNames = dbLocations.map((location) => location.name)
    const partnerNames = dbPartners.map((partner) => partner.name)
    const gradesTypes = await GradeType.query().where('user_id', user.id).preload('grades')

    return inertia.render<{
      review: ReviewResponse
      dbLocations: string[]
      dbPartners: string[]
      dbGradeTypes: FormGradeType[]
    }>('reviews/show', {
      review: responseData,
      dbLocations: locationNames,
      dbPartners: partnerNames,
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
  async updateGrades({ request, response, params, session }: HttpContext) {
    const review = await Review.findOrFail(params.id)
    await review.load('grades')
    const payload = await updateGradesValidator.validate(request.all())

    for (const grade of payload.grades) {
      const existingGrade = await review.grades.find((g) => g.gradeTypeId === grade.gradeTypeId)
      if (existingGrade && existingGrade.value !== grade.grade) {
        await review.related('grades').detach([existingGrade.id])

        // Attach la nouvelle grade
        const newGrade = await Grade.query()
          .where('grade_type_id', grade.gradeTypeId)
          .where('value', grade.grade)
          .firstOrFail()

        await review.related('grades').attach([newGrade.id])

        await review.save()
      }
    }

    session.flash('notification', {
      type: 'success',
      message: 'Les notes ont bien été mises à jour !',
    })

    return response.redirect().toRoute('reviews.show', { id: review.id })
  }

  @inject()
  async delete({ session, params, response }: HttpContext) {
    const review = await Review.findOrFail(params.id)
    await review.delete()

    session.flash('notification', {
      type: 'success',
      message: 'La review a bien été supprimée',
    })

    return response.redirect().toRoute('reviews.index')
  }
}
