export function useGrades() {
  function calculateTotalGrade(grades: { grade: number; maxGrade: number }[]) {
    const maxGradeSum = grades.reduce((total, grade) => total + grade.maxGrade, 0)
    const gradeSum = grades.reduce((total, grade) => total + grade.grade, 0)
    return (gradeSum / maxGradeSum) * 100
  }

  return {
    calculateTotalGrade,
  }
}
