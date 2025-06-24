import User from '#models/user'
import env from '#start/env'
import { createUserValidator } from '#validators/users'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import mail from '@adonisjs/mail/services/main'

export default class SessionController {
  @inject()
  async create({ inertia, session, request }: HttpContext) {
    request.url().includes('register')
    if (
      session.flashMessages.all().errorsBag &&
      session.flashMessages.all().errorsBag.hasOwnProperty('E_INVALID_CREDENTIALS')
    ) {
      return inertia.render<{}>('auth/index', {
        errors: { password: "Le nom d'utilisateur ou le mot de passe est invalide" },
        page: request.url().includes('register') ? 'register' : 'login',
      })
    } else {
      return inertia.render<{}>('auth/index', {
        page: request.url().includes('register') ? 'register' : 'login',
      })
    }
  }

  @inject()
  async signUp({ request, auth, response }: HttpContext) {
    const payload = await createUserValidator.validate(request.all())

    await User.create(payload)
    const user = await User.findByOrFail('email', payload.email)

    if (app.inProduction) {
      await mail.send((message) => {
        message
          .to(env.get('MAIL_ADMIN'))
          .from(env.get('MAIL_FROM'))
          .subject('New user on Movie Elo !')
          .htmlView('emails/admin_new_user', {
            username: user.username,
            email: user.email,
            date: new Date().toLocaleDateString(),
          })
      })
    }

    await auth.use('web').login(user)

    return response.redirect().toRoute('home')
  }

  @inject()
  async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user, !!request.input('rememberMe'))

    return response.redirect().toRoute('home')
  }

  @inject()
  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('auth')
  }
}
