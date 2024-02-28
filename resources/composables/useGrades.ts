// useGrades.ts
import { ref } from 'vue'

export function useGrades() {
  function calculateTotalGrade(grades: Record<string, number>) {
    return (Object.values(grades).reduce((total, grade) => total + grade, 0) / 20) * 100
  }

  return {
    calculateTotalGrade,
  }
}
