import type { Review, GradeType, Grade } from './review.ts'
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

export type FormGrade = Grade & { movie: string }
export type FormGradeTyoe = GradeType & { grades: FormGrade[] }

export type ReviewFormResponse = {
  homeTmdbMovieId?: string
  homeTmdbMovieTitle?: string
  dbLocations: string[]
  dbPartners: string[]
  dbGradeTypes: FormGradeTyoe[]
  errors?: {
    tmdbMovieId?: string[]
    locations?: string[]
    partners?: string[]
  }
}
