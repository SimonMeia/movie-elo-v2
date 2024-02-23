import Review from '#models/review'
import { type UserId } from '#models/user'
import { ReviewResponse, ReviewsResponse } from '#types/response'

class ReviewService {
  async getReview(reviewId: number, userId: UserId): Promise<Review> {
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
      .where('id', reviewId)
      .where('userId', userId)
      .firstOrFail()

    return review
  }

  async getAllReviews(userId: UserId) {
    const review: Review[] = await Review.query()
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
      .where('userId', userId)

    return review
  }

  async getReviewsResponse(userId: UserId) {
    const reviews = await this.getAllReviews(userId)
    const reviewsResponse: ReviewsResponse = {
      reviews: reviews.map((review) => {
        return {
          review: {
            id: review.id,
            grades: {
              acting: review.acting,
              story: review.story,
              music: review.music,
              directing: review.directing,
              feeling: review.feeling,
              personal: review.personal,
            },
            comment: review.comment,
            viewings: review.viewngs.map((v) => {
              return {
                id: v.id,
                date: v.viewingDate.toString(),
                locations: v.locations.map((l) => {
                  return {
                    id: l.id,
                    name: l.name,
                  }
                }),
                partners: v.partners.map((p) => {
                  return {
                    id: p.id,
                    name: p.name,
                  }
                }),
              }
            }),
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
      }),
    }
    return reviewsResponse
  }

  async getReviewResponse(reviewId: number, userId: UserId) {
    const review = await this.getReview(reviewId, userId)

    const responsData: ReviewResponse = {
      review: {
        id: review.id,
        grades: {
          acting: review.acting,
          story: review.story,
          music: review.music,
          directing: review.directing,
          feeling: review.feeling,
          personal: review.personal,
        },
        comment: review.comment,
        viewings: review.viewngs.map((v) => {
          return {
            id: v.id,
            date: v.viewingDate.toString(),
            locations: v.locations.map((l) => {
              return {
                id: l.id,
                name: l.name,
              }
            }),
            partners: v.partners.map((p) => {
              return {
                id: p.id,
                name: p.name,
              }
            }),
          }
        }),
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

    return responsData
  }
}

export default new ReviewService()
