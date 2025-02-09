import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import GradeType from '#models/grade_type'
import { createGradeTypeValidator } from '#validators/create_grade_type'

export default class GradeTypesController {
  @inject()
  async create({ inertia, auth }: HttpContext) {
    const user = auth.user!
    const gradeTypes = await GradeType.query().where('user_id', user.id).preload('grades')
    return inertia.render<{ gradeTypes: GradeType[] }>('grade_types_creation/main', {
      gradeTypes: gradeTypes,
    })
  }

  @inject()
  async store({ request, response, auth, session }: HttpContext) {
    const user = auth.user!

    const payload = await createGradeTypeValidator.validate(request.all(), {})

    const gradeType = await GradeType.create({
      name: payload.name,
      maxGrade: payload.maxGrade,
      userId: user.id,
    })

    gradeType.related('grades').createMany(payload.grades)

    session.flash('notification', {
      type: 'success',
      message: 'La catégorie a bien été ajoutée !',
    })

    return response.redirect().toRoute('/grade-types')
  }

  @inject()
  async validate({ auth, response, session }: HttpContext) {
    const user = auth.user!

    await user.load('gradeTypes')

    if (user.gradeTypes.length === 0) {
      session.flash('notification', {
        type: 'error',
        message: 'Veuillez ajouter au moins une catégorie de notes !',
      })
      return response.redirect().toRoute('/grade-types')
    }

    user.gradeTypesValidated = true
    await user.save()

    session.flash('notification', {
      type: 'success',
      message: 'Bienvenue !',
    })

    return response.redirect().toRoute('/home')
  }

  @inject()
  async delete({ auth, response, request, session }: HttpContext) {
    const user = auth.user!

    const deletedRows = await GradeType.query()
      .where('user_id', user.id)
      .where('id', request.param('id'))
      .delete()

    if (deletedRows.length > 0) {
      session.flash('notification', {
        type: 'success',
        message: 'La catégorie a bien été supprimée',
      })
    }

    return response.redirect().toRoute('/grade-types')
  }
}
