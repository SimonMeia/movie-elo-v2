import TmdbService from '#services/tmdb_service'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

async function isTmdbMovieIdValid(value: unknown, _option: unknown, field: FieldContext) {
  if (typeof value !== 'number') {
    return
  }
  const isValid = await TmdbService.isMovieIdValid(value)
  if (!isValid) {
    field.report("Le film séléctionné n'est pas valide", 'movieIdValidityRule', field)
  }
}

const movieIdValidityRule = vine.createRule(isTmdbMovieIdValid, {
  implicit: true,
  isAsync: true,
})

export const createReviewValidator = vine.compile(
  vine.object({
    tmdbMovieId: vine.number().use(movieIdValidityRule()),
    grades: vine
      .array(
        vine.object({
          gradeTypeId: vine.number(),
          grade: vine.number().min(1),
        })
      )
      .minLength(1),
    locations: vine.array(vine.string()).minLength(1),
    partners: vine.array(vine.string()).minLength(1),
    date: vine.date(),
    comment: vine.string().nullable(),
  })
)

createReviewValidator.messagesProvider = new SimpleMessagesProvider({
  'locations.array.minLength': 'Veuillez selectionner au moins un lieu',
  'partners.array.minLength': 'Veuillez selectionner au moins un partenaire',
})
