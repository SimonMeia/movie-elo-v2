import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'
import { AdminUserProfile } from '#types/user'
import User from '#models/user'

export default class AdminController {
  @inject()
  async index({ inertia }: HttpContext) {
    const dbUsers = await User.query()
      .preload('reviews')
      .preload('locations')
      .preload('gradeTypes')
      .preload('partners')
      .orderBy('createdAt', 'desc')

    const users: AdminUserProfile[] = dbUsers.map((user: User) => {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt.toString(),
        updatedAt: user.updatedAt ? user.updatedAt.toString() : null,
        hasValidatedGradeTypes: user.gradeTypesValidated,
        totalReviews: user.reviews.length || 0,
        totalLocations: user.locations.length || 0,
        totalGradeTypes: user.gradeTypes.length || 0,
        totalPartners: user.partners.length || 0,
      }
    })

    return inertia.render<{ users: AdminUserProfile[] }>('admin/users', { users: users })
  }
}
