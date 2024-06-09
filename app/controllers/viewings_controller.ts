import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { createViewingValidator } from '#validators/viewing'
import ViewingService from '#services/viewing_service'

export default class ViewingsController {
  @inject()
  async store({ request, response, auth }: HttpContext) {
    const user = auth.user!

    const payload = await createViewingValidator.validate(request.all())

    await ViewingService.createViewing(
      user.id,
      payload.date,
      payload.reviewId,
      payload.locations,
      payload.partners
    )

    return response.redirect().toRoute('reviews.show', { id: 1 })
  }
}
