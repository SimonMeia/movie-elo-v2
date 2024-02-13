import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

export default class HomeController {
  @inject()
  async index(ctx: HttpContext) {
    return ctx.inertia.render<{}>('home/main', {})
  }
}
