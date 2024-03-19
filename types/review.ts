import { GradeType } from './grade.js'

export type Review = {
  id: number
  grades: {
    givenGrade: number
    gradeType: GradeType
  }[]
  elo: number
  viewings: Viewing[]
  comment: string | null
}

export type Viewing = {
  id: number
  date: string
  locations: Location[]
  partners: Partner[]
}

export type Location = {
  id: number
  name: string
}

export type Partner = {
  id: number
  name: string
}
