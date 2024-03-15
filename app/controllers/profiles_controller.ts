import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {
  @inject()
  async index({ inertia }: HttpContext) {
    return inertia.render<{}>('profile/main', {})
  }
}
