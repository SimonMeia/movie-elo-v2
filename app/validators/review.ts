import Review from '#models/review'
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

async function isMovieUnique(value: unknown, _option: unknown, field: FieldContext) {
  if (typeof value !== 'number') {
    return
  }

  const movie = await Review.query()
    .where('user_id', field.meta.userId)
    .join('movies', 'movies.id', 'reviews.movie_id')
    .where('movies.tmdb_id', value)
    .first()

  if (movie) {
    field.report('Vous avez déjà un review pour ce film', 'movieIdValidityRule', field)
  }
}

const movieIdValidityRule = vine.createRule(isTmdbMovieIdValid, {
  implicit: true,
  isAsync: true,
})
const isMovieUniqueRule = vine.createRule(isMovieUnique, {
  implicit: true,
  isAsync: true,
})

export const createReviewValidator = vine.compile(
  vine.object({
    tmdbMovieId: vine.number().use(movieIdValidityRule()).use(isMovieUniqueRule()),
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
  'tmdbMovieId.required': 'Veuillez selectionner un film',
  'locations.array.minLength': 'Veuillez selectionner au moins un lieu',
  'partners.array.minLength': 'Veuillez selectionner au moins un partenaire',
})
