import type { Grade } from '@/types'

export function useGrades() {
  function calculateTotalGrade(grades: Grade[]) {
    const maxGradeSum = grades.reduce((total, grade) => total + grade.maxGrade, 0)
    const gradeSum = grades.reduce((total, grade) => total + grade.grade, 0)
    const totalGrade = (gradeSum / maxGradeSum) * 100
    return totalGrade
  }

  return {
    calculateTotalGrade,
  }
}
