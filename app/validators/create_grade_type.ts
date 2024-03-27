import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createGradeTypeValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    maxGrade: vine.number().min(2).max(10),
    grades: vine
      .array(
        vine.object({
          description: vine.string().trim(),
          value: vine.number().min(1).max(10),
        })
      )
      .minLength(1),
  })
)

createGradeTypeValidator.messagesProvider = new SimpleMessagesProvider({
  'tmdbMovieId.required': 'Veuillez selectionner un film',
  'locations.array.minLength': 'Veuillez selectionner au moins un lieu',
  'partners.array.minLength': 'Veuillez selectionner au moins un partenaire',
})
