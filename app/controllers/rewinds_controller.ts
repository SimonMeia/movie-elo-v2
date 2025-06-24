import Viewing from '#models/viewing'
import RewindService from '#services/rewind_service'
import { Rewind } from '#types/rewind'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class RewindsController {
  @inject()
  async index({ inertia, auth }: HttpContext) {
    const user = auth.user!

    const yearsWithData = await Viewing.query()
      .whereHas('review', (review) => {
        review.where('user_id', user.id)
      })
      .distinct()
      .select(db.raw('EXTRACT(YEAR FROM viewing_date) AS year'))
      .orderBy('year', 'desc')

    // Extraire les années en tableau
    const years = yearsWithData.map((record) => record.$extras.year)

    console.log(years)

    // Récupérer les données pour chaque année avec le service
    const rewinds = await Promise.all(
      years.map((year) => RewindService.getRewindData(user.id, year))
    )
    const filteredRewinds = rewinds.filter((r): r is Rewind => r !== null)

    return inertia.render<{ rewinds: Rewind[] }>('rewind/index', { rewinds: filteredRewinds })
  }
}
