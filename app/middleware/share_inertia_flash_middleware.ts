import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ShareInertiaFlash {
  handle({ session, inertia }: HttpContext, next: NextFn) {
    inertia.share({
      notification: session.flashMessages.all(),
    })

    return next()
  }
}
