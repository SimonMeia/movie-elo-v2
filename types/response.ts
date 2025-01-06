import type { Review } from './review.ts'
import type { Movie } from './movie.ts'
import { Grade, GradeType } from './grade.js'

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
export type FormGradeType = GradeType & { grades: FormGrade[] }

export type ReviewFormResponse = {
  homeTmdbMovieId?: string
  homeTmdbMovieTitle?: string
  dbLocations: string[]
  dbPartners: string[]
  dbGradeTypes: FormGradeType[]
  errors?: {
    tmdbMovieId?: string[]
    locations?: string[]
    partners?: string[]
  }
}

export type GradeTypesResponse = {
  errors?: {
    [key: string]: string[]
  }
  gradeTypes: GradeType[]
}
