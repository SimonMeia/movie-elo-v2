import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class IsAdminMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    const user = auth.user
    if (!user) return response.redirect().toRoute('auth')
    if (!user.isAdmin) {
      return response.status(403).send('Forbidden: You do not have admin access.')
    }
    return next()
  }
}
