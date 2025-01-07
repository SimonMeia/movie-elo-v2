import Review from '#models/review'
import { type UserId } from '#models/user'
import {
  GradedReview,
  ReviewResponse,
  ReviewsResponse,
  ViewingWithMovieTitle,
} from '#types/response'
import db from '@adonisjs/lucid/services/db'
import { PaginationMeta } from '#types/pagination'
import Viewing from '#models/viewing'

class ReviewService {
  async getReviewsSortedByGrade(
    userId: UserId,
    page = 1,
    perPage = 20
  ): Promise<{
    data: GradedReview[]
    meta: PaginationMeta
  }> {
    let reviews = await Review.query()
      .where('userId', userId)
      .select('reviews.*')
      .join('grade_review', 'reviews.id', '=', 'grade_review.review_id')
      .join('grades', 'grade_review.grade_id', '=', 'grades.id')
      .join('movies', 'reviews.movie_id', '=', 'movies.id')
      .groupBy('reviews.id')
      .select(db.raw('SUM(grades.value) as total_grade'))
      .orderBy('total_grade', 'desc')
      .orderBy('movies.title', 'asc')
      .preload('movie')
      .preload('grades', (grade) => grade.preload('gradeType', (type) => type.preload('grades')))
      .paginate(page, perPage)

    // console.log(reviews)
    const data: GradedReview[] = []
    for (let review of reviews) {
      data.push({
        id: review.id,
        title: review.movie.title,
        grades: review.grades.map((grade) => ({
          givenGrade: grade.value,
          gradeType: {
            id: grade.gradeType.id,
            name: grade.gradeType.name,
            maxGrade: grade.gradeType.maxGrade,
            grades: grade.gradeType.grades.map((g) => ({
              id: g.id,
              description: g.description,
              grade: g.value,
            })),
          },
        })),
      })
    }

    const paginationJSON = reviews.toJSON()

    return {
      data: data,
      meta: paginationJSON.meta as PaginationMeta,
    }
  }

  async getReviewsSortedByViewing(
    userId: UserId,
    page = 1,
    perPage = 20
  ): Promise<{
    data: ViewingWithMovieTitle[]
    meta: PaginationMeta
  }> {
    let viewings = await Viewing.query()
      .select('reviews.*', 'viewings.*')
      .join('reviews', 'reviews.id', '=', 'viewings.review_id')
      .join('movies', 'reviews.movie_id', '=', 'movies.id')
      .where('reviews.user_id', userId)
      .orderBy('viewings.viewing_date', 'desc')
      .orderBy('movies.title', 'asc')
      .preload('review', (review) => {
        review.preload('movie')
      })
      .preload('partners')
      .preload('locations')
      .paginate(page, perPage)

    // console.log(reviews)
    const data: ViewingWithMovieTitle[] = []
    for (let viewing of viewings) {
      data.push({
        title: viewing.review.movie.title,
        reviewId: viewing.review.id,
        date: viewing.viewingDate.toString(),
        locations: viewing.locations.map((l) => l.name),
        partners: viewing.partners.map((p) => p.name),
      })
    }

    const paginationJSON = viewings.toJSON()

    return {
      data: data,
      meta: paginationJSON.meta as PaginationMeta,
    }
  }

  async getReview(reviewId: number, userId: UserId): Promise<ReviewResponse> {
    const review: Review = await Review.query()
      .preload('movie', (movie) => {
        movie.preload('actors')
        movie.preload('directors')
        movie.preload('composers')
        movie.preload('countries')
        movie.preload('genres')
      })
      .preload('viewings', (viewing) => {
        viewing.preload('locations')
        viewing.preload('partners')
      })
      .preload('grades', (grade) => grade.preload('gradeType', (type) => type.preload('grades')))
      .where('id', reviewId)
      .where('userId', userId)
      .firstOrFail()

    return this.transformReviewToResponse(review)
  }

  async getLastReviews(userId: UserId, limit: number): Promise<ReviewsResponse> {
    const reviews = await Review.query()
      .join('viewings', 'viewings.review_id', 'reviews.id')
      .where('reviews.user_id', userId)
      .orderBy('viewings.viewing_date', 'desc')
      .limit(limit)
      .select('reviews.*')
      .preload('movie', (movie) => {
        movie.preload('actors')
        movie.preload('directors')
        movie.preload('composers')
        movie.preload('countries')
        movie.preload('genres')
      })
      .preload('viewings', (viewing) => {
        viewing.preload('locations')
        viewing.preload('partners')
      })
      .preload('grades', (grade) => grade.preload('gradeType', (type) => type.preload('grades')))

    return {
      reviews: reviews.map(this.transformReviewToResponse),
    }
  }

  private transformReviewToResponse(review: Review): ReviewResponse {
    const grades = review.grades.map((grade) => ({
      givenGrade: grade.value,
      gradeType: {
        id: grade.gradeType.id,
        name: grade.gradeType.name,
        maxGrade: grade.gradeType.maxGrade,
        grades: grade.gradeType.grades.map((g) => ({
          id: g.id,
          description: g.description,
          grade: g.value,
        })),
      },
    }))

    const viewings = review.viewings
      .sort((a, b) => b.viewingDate.toMillis() - a.viewingDate.toMillis())
      .map((v) => ({
        id: v.id,
        date: v.viewingDate.toString(),
        locations: v.locations.map((l) => ({
          id: l.id,
          name: l.name,
        })),
        partners: v.partners.map((p) => ({
          id: p.id,
          name: p.name,
        })),
      }))

    const movies = {
      actors: review.movie.actors,
      directors: review.movie.directors,
      composers: review.movie.composers,
      countries: review.movie.countries,
      genres: review.movie.genres,
      id: review.movie.id,
      title: review.movie.title,
      synopsis: review.movie.synopsis,
      releaseDate: review.movie.releaseDate?.toJSDate(),
      runtime: review.movie.runtime,
      backdropPath: review.movie.backdropPath,
      posterPath: review.movie.posterPath,
      tmdbId: review.movie.tmdbId,
    }

    return {
      review: {
        id: review.id,
        comment: review.comment,
        elo: review.elo,
        viewings: viewings,
        grades: grades,
      },
      movie: movies,
    }
  }
}

export default new ReviewService()
