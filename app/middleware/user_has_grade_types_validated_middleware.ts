import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class UserHasGradeTypesMiddleware {
  async handle(ctx: HttpContext, next: NextFn, options: { mustBeValidated: boolean }) {
    /**
     * Middleware logic goes here (before the next call)
     */

    if (options.mustBeValidated && ctx.auth.user!.gradeTypesValidated) await next()
    if (!options.mustBeValidated && !ctx.auth.user!.gradeTypesValidated) await next()
    if (!options.mustBeValidated && ctx.auth.user!.gradeTypesValidated) ctx.response.redirect('/')
    if (options.mustBeValidated && !ctx.auth.user!.gradeTypesValidated)
      ctx.response.redirect('/grade-types')
  }
}
