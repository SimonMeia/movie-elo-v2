import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { createReviewValidator } from '#validators/review'
import { ReviewResponse } from '../../types/response.js'
import MovieService from '#services/movie_service'
import Review from '#models/review'

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
    const payload = await createReviewValidator.validate(ctx.request.all())

    // 1. Check si le film existe, sinon le créer
    const movie = await MovieService.getAndCreateMovie(payload.tmdbMovieId)
    await movie.load('actors')
    await movie.load('directors')
    await movie.load('composers')
    await movie.load('countries')
    await movie.load('genres')

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
    const response: ReviewResponse = {
      movie: {
        id: movie.id,
        tmdbId: movie.tmdbId,
        title: movie.title,
        synopsis: movie.synopsis,
        runtime: movie.runtime,
        backdropPath: movie.backdropPath,
        posterPath: movie.posterPath,
        releaseDate: movie.releaseDate.toJSDate(),
        actors: movie.actors,
        directors: movie.directors,
        composers: movie.composers,
        countries: movie.countries,
        genres: movie.genres,
      },
      review: {
        id: review.id,
        ...payload,
      },
    }
    return ctx.inertia.render<ReviewResponse>('review/main', response)
  }
}
