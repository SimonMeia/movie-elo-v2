import vine from '@vinejs/vine'

export const createReviewValidator = vine.compile(
  vine.object({
    tmdbMovieId: vine.number(),
    grades: vine.object({
      story: vine.number(),
      acting: vine.number(),
      music: vine.number(),
      directing: vine.number(),
      feeling: vine.number(),
      personal: vine.number(),
    }),
    locations: vine.array(vine.string()),
    partners: vine.array(vine.string()),
    date: vine.date(),
    comment: vine.string().nullable(),
  })
)
