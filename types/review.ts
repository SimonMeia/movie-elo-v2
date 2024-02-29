export type Review = {
  id: number
  grades: Grade[]
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
  maxGrade: number
  gradeTypeName: string
  gradeTypeId: number
}
