import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import Movie from '#models/movie'
import { ProfileStatistics } from '#types/user'

export default class ProfilesController {
  @inject()
  async index({ inertia, auth }: HttpContext) {
    const user = auth.user!

    const userMovies = await Movie.query()
      .whereHas('reviews', (reviews) => {
        reviews.where('user_id', user.id)
      })
      .preload('reviews', (reviews) => {
        reviews.where('user_id', user.id)
      })

    const timeSpentMin = userMovies.reduce((acc, movie) => acc + movie.runtime, 0)

    return inertia.render<{
      statistics: ProfileStatistics
    }>('profile/main', {
      statistics: { movieCount: userMovies.length, timeSpentMin: timeSpentMin },
    })
  }
}
