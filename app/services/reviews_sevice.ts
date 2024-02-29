import Review from '#models/review'
import { type UserId } from '#models/user'
import { ReviewResponse, ReviewsResponse } from '#types/response'

class ReviewService {
  async getAllReviews(userId: UserId): Promise<ReviewsResponse> {
    const reviews: Review[] = await Review.query()
      .preload('movie', (movie) => {
        movie.preload('actors')
        movie.preload('directors')
        movie.preload('composers')
        movie.preload('countries')
        movie.preload('genres')
      })
      .preload('viewngs', (viewing) => {
        viewing.preload('locations')
        viewing.preload('partners')
      })
      .preload('grades', (grades) => grades.preload('gradeType'))
      .where('userId', userId)

    return {
      reviews: reviews.map(this.transformReviewToResponse),
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
      .preload('viewngs', (viewing) => {
        viewing.preload('locations')
        viewing.preload('partners')
      })
      .preload('grades', (grades) => grades.preload('gradeType'))
      .where('id', reviewId)
      .where('userId', userId)
      .firstOrFail()

    return this.transformReviewToResponse(review)
  }

  async getLastReviews(userId: UserId, limit: number): Promise<ReviewsResponse> {
    const reviews: Review[] = await Review.query()
      .preload('movie', (movie) => {
        movie.preload('actors')
        movie.preload('directors')
        movie.preload('composers')
        movie.preload('countries')
        movie.preload('genres')
      })
      .preload('viewngs', (viewing) => {
        viewing.preload('locations')
        viewing.preload('partners')
      })
      .preload('grades', (grades) => grades.preload('gradeType'))
      .where('userId', userId)
      .orderBy('createdAt', 'desc')
      .limit(limit)

    return {
      reviews: reviews.map(this.transformReviewToResponse),
    }
  }

  private transformReviewToResponse(review: Review): ReviewResponse {
    return {
      review: {
        id: review.id,
        grades: review.grades.map((g) => ({
          id: g.id,
          grade: g.grade,
          maxGrade: g.gradeType.maxGrade,
          gradeTypeName: g.gradeType.name,
          gradeTypeId: g.gradeTypeId,
        })),
        comment: review.comment,
        viewings: review.viewngs.map((v) => ({
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
        })),
      },
      movie: {
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
      },
    }
  }
}

export default new ReviewService()
