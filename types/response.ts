import type { Review } from './review.ts'
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
  dbGradeTypes: {
    id: number
    name: string
    maxGrade: number
  }[]
  errors?: {
    tmdbMovieId?: string[]
    locations?: string[]
    partners?: string[]
  }
}
