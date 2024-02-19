import TmdbService from '#services/tmdb_service'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

async function isTmdbMovieIdValid(value: unknown, option: unknown, field: FieldContext) {
  if (typeof value !== 'number') {
    return
  }
  const isValid = await TmdbService.isMovieIdValid(value)
  if (!isValid) {
    field.report('The movie id is not valid', 'movieIdValidityRule', field)
  }
}

const movieIdValidityRule = vine.createRule(isTmdbMovieIdValid, {
  implicit: true,
  isAsync: true,
})

export const createReviewValidator = vine.compile(
  vine.object({
    tmdbMovieId: vine.number().use(movieIdValidityRule()),
    grades: vine.object({
      story: vine.number(),
      acting: vine.number(),
      music: vine.number(),
      directing: vine.number(),
      feeling: vine.number(),
      personal: vine.number(),
    }),
    locations: vine.array(vine.string()).minLength(1),
    partners: vine.array(vine.string()).minLength(1),
    date: vine.date(),
    comment: vine.string().nullable(),
  })
)
