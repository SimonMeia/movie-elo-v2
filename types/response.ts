import type { Review } from './review.ts'
import type { Movie } from './movie.ts'

export type ReviewResponse = {
  review: Review
  movie: Movie
}

export type ReviewsResponse = {
  reviews: ReviewResponse[]
}
