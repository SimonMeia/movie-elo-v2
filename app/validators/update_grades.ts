import vine from '@vinejs/vine'
import { isGradeValidRule } from './rules/is_grade_valid.js'

export const updateGradesValidator = vine.compile(
  vine.object({
    grades: vine
      .array(
        vine
          .object({
            gradeTypeId: vine.number(),
            grade: vine.number(),
          })
          .use(isGradeValidRule({}))
      )
      .minLength(1),
  })
)
