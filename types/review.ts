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

export type Grade = {
  id: number
  grade: number
  description: string
}

export type GradeType = {
  id: number
  name: string
  maxGrade: number
  grades: Grade[]
}
