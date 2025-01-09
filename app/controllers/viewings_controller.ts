import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { createViewingValidator } from '#validators/viewing'
import ViewingService from '#services/viewing_service'

export default class ViewingsController {
  @inject()
  async store({ request, response, auth, session }: HttpContext) {
    const user = auth.user!

    const payload = await createViewingValidator.validate(request.all())

    await ViewingService.createViewing(
      user.id,
      payload.date,
      payload.reviewId,
      payload.locations,
      payload.partners
    )

    session.flash('notification', {
      type: 'success',
      message: 'Le visionnage à bien été ajouté !',
    })

    return response.redirect().toRoute('reviews.show', { id: payload.reviewId })
  }
}
