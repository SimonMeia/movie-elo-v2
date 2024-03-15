import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {
  @inject()
  async index({ inertia, auth }: HttpContext) {
    const user = auth.user!

    return inertia.render<{}>('profile/main', {})
  }
}
