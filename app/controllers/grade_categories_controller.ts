import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

export default class GradeCategoriesController {
  @inject()
  async create({ inertia }: HttpContext) {
    return inertia.render<{}>('grade_categories_creation/main')
  }
}
