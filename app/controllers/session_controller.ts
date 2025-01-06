import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import User from '#models/user'
import { createUserValidator } from '#validators/users'

export default class SessionController {
  @inject()
  async create({ inertia, session }: HttpContext) {
    if (
      session.flashMessages.all().errorsBag &&
      session.flashMessages.all().errorsBag.hasOwnProperty('E_INVALID_CREDENTIALS')
    ) {
      return inertia.render<{}>('auth/main', {
        errors: { password: ["Le nom d'utilisateur ou le mot de passe est invalide"] },
      })
    } else {
      return inertia.render<{}>('auth/main')
    }
  }

  @inject()
  async signUp({ request, auth, response }: HttpContext) {
    const payload = await createUserValidator.validate(request.all())

    await User.create(payload)
    const user = await User.findByOrFail('email', payload.email)

    await auth.use('web').login(user)

    return response.redirect().toRoute('/grade-types')
  }

  @inject()
  async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return response.redirect().toRoute('/')
  }

  @inject()
  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('/auth')
  }
}
