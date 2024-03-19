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
