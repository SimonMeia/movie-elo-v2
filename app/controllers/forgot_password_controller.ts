import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import User from '#models/user'
import string from '@adonisjs/core/helpers/string'
import mail from '@adonisjs/mail/services/main'
import env from '#start/env'
import ForgotPasswordToken from '#models/forgot_password_token'
import vine from '@vinejs/vine'
import { passwordRule } from '#validators/rules/is_password_complex'

export default class PasswordResetController {
  @inject()
  async showForgotPasswordForm({ inertia }: HttpContext) {
    return inertia.render('auth/forgot-password')
  }

  @inject()
  async sendResetEmail({ request, response, session }: HttpContext) {
    const email = request.input('email')

    const user = await User.findBy('email', email)

    console.log(user)

    if (!user) {
      session.flash('notification', {
        type: 'error',
        message: 'Email introuvable',
      })
      return response.redirect().back()
    }

    const token = string.random(32)

    await ForgotPasswordToken.create({
      email: user.email,
      token: token,
    })

    await mail.send((message) => {
      message
        .to(user.email)
        .from(env.get('MAIL_FROM'))
        .subject('Réinitialisation du mot de passe')
        .htmlView('emails/forgot_password', {
          token: token,
        })
    })

    session.flash('notification', {
      type: 'success',
      message: 'Email envoyé',
    })
    return response.redirect().back()
  }

  @inject()
  async showResetPasswordForm({ request, inertia }: HttpContext) {
    return inertia.render<{ token: string }>('auth/reset-password', { token: request.qs().token })
  }

  @inject()
  async resetPassword({ request, response, session }: HttpContext) {
    const schema = vine.compile(
      vine.object({
        token: vine.string(),
        password: vine
          .string()
          .confirmed({ confirmationField: 'passwordConfirmation' })
          .use(passwordRule({ column: 'password' })),
      })
    )

    const payload = await schema.validate(request.all())

    const forgotPasswordToken = await ForgotPasswordToken.findBy('token', payload.token)

    if (!forgotPasswordToken) {
      session.flash('notification', {
        type: 'error',
        message: 'Token introuvable',
      })
      return response.redirect().back()
    }

    if (forgotPasswordToken.createdAt.diffNow('hours').hours > 24) {
      session.flash('notification', {
        type: 'error',
        message: 'Le token a expiré',
      })
      await forgotPasswordToken.delete()
      return response.redirect().back()
    }

    const user = await User.findBy('email', forgotPasswordToken.email)

    if (!user) {
      session.flash('notification', {
        type: 'error',
        message: 'Utilisateur introuvable',
      })
      return response.redirect().back()
    }

    user.password = payload.password
    await user.save()

    await forgotPasswordToken.delete()

    session.flash('notification', {
      type: 'success',
      message: 'Mot de passe mis à jour',
    })

    return response.redirect().toRoute('auth')
  }
}
