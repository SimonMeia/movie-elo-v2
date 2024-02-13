import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import tmdbh_service from '#services/tmdbh_service'

export default class HomeController {
  @inject()
  async index(ctx: HttpContext) {
    return ctx.inertia.render<{}>('home/main', {})
  }

  @inject()
  async search(ctx: HttpContext) {
    return await tmdbh_service.searchMovies(ctx.request.input('query'))
  }
}
