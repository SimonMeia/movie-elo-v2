// useGrades.ts
import type { Grade } from '@/types'
import { ref } from 'vue'

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
