import { Grade, GradeType } from './grade.js'
import { Review } from './review.js'
import { Movie } from './movie.js'

export type ReviewResponse = {
  review: Review
  movie: Movie
}

export type ViewingWithMovieTitle = {
  reviewId: number
  title: string
  date: string
  locations: string[]
  partners: string[]
}
export type GradedReview = {
  id: number
  title: string
  totalGrade: number
  grades: {
    givenGrade: number
    gradeType: GradeType
  }[]
}

export type ReviewCard = {
  title: string
  reviewId: number
  grade: number
  backdropPath: string
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
