import type { Review, GradeType } from './review.ts'
import type { Movie } from './movie.ts'

export type ReviewResponse = {
  review: Review
  movie: Movie
}

export type ReviewsResponse = {
  reviews: ReviewResponse[]
}

export type HomeResponse = {
  reviews: ReviewResponse[]
}

export type ReviewFormResponse = {
  homeTmdbMovieId?: string
  homeTmdbMovieTitle?: string
  dbLocations: string[]
  dbPartners: string[]
  dbGradeTypes: GradeType[]
  errors?: {
    tmdbMovieId?: string[]
    locations?: string[]
    partners?: string[]
  }
}
