import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class UserHasGradeTypesMiddleware {
  async handle(ctx: HttpContext, next: NextFn, options: { mustBeValidated: boolean }) {
    /**
     * Middleware logic goes here (before the next call)
     */

    const user = ctx.auth.user

    if (!user) return ctx.response.redirect().toRoute('auth')

    if (options.mustBeValidated && user.gradeTypesValidated) await next()

    if (!options.mustBeValidated && !user.gradeTypesValidated) await next()

    if (!options.mustBeValidated && user.gradeTypesValidated)
      ctx.response.redirect().toRoute('home')

    if (options.mustBeValidated && !user.gradeTypesValidated)
      ctx.response.redirect().toRoute('grade-types.create')
  }
}
