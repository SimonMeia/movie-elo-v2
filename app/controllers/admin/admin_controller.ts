import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'
import { User } from '#types/user'

export default class AdminController {
  @inject()
  async index({ inertia }: HttpContext) {
    const users = await db.query().from('users').orderBy('created_at', 'desc')

    return inertia.render<{ users: User[] }>('admin/home', { users: users })
  }
}
