import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'
import GradeType from '#models/grade_type'

/**
 * Options accepted by the unique rule
 */
type Options = {}

/**
 * Implementation
 */
async function isGradeValid(value: unknown, _options: Options, field: FieldContext) {
  const data = value as { gradeTypeId: number; grade: number }
  const gradeType = await GradeType.find(data.gradeTypeId)

  if (!gradeType) {
    return field.report('The grade type does not exists', 'isInGradeRange', field)
  }

  if (data.grade > gradeType.maxGrade) {
    field.report('The grade value is out of range', 'isInGradeRange', field)
  } else if (data.grade < 1) {
    field.report('The grade value is out of range', 'isInGradeRange', field)
  }
}

export const isGradeValidRule = vine.createRule(isGradeValid)
