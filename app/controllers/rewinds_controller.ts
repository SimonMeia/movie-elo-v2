import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import RewindService from '#services/rewind_service'
import { Rewind } from '#types/rewind'

export default class RewindsController {
  @inject()
  async index({ inertia, auth, request }: HttpContext) {
    const user = auth.user!
    const year = request.params().year

    const rewind: Rewind = await RewindService.getRewindData(user.id, year)

    return inertia.render<{ rewind: Rewind }>('rewind/main', { rewind: rewind })
  }
}
