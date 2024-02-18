import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import TmdbService from '#services/tmdb_service'

export default class MoviesController {
  @inject()
  async search(ctx: HttpContext) {
    return await TmdbService.searchMovies(ctx.request.input('id'))
  }
}
