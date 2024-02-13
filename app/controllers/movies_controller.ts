import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import tmdbh_service from '#services/tmdbh_service'

export default class MoviesController {
  @inject()
  async search(ctx: HttpContext) {
    return await tmdbh_service.searchMovies(ctx.request.input('query'))
  }
}
