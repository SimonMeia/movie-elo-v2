import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import GradeType from '#models/grade_type'

export default class GradeTypesController {
  @inject()
  async create({ inertia, auth }: HttpContext) {
    const user = auth.user!
    const gradeTypes = await GradeType.query().where('user_id', user.id).preload('grades')
    return inertia.render<{ gradeTypes: GradeType[] }>('grade_types_creation/main', {
      gradeTypes: gradeTypes,
    })
  }
}
