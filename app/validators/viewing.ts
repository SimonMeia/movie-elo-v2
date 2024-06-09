import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createViewingValidator = vine.compile(
  vine.object({
    reviewId: vine.number(),
    locations: vine.array(vine.string()).minLength(1),
    partners: vine.array(vine.string()).minLength(1),
    date: vine.date().beforeOrEqual('today'),
  })
)

createViewingValidator.messagesProvider = new SimpleMessagesProvider({
  'locations.array.minLength': 'Veuillez selectionner au moins un lieu',
  'partners.array.minLength': 'Veuillez selectionner au moins un partenaire',
  'date.required': 'Veuillez selectionner une date',
  'date.beforeOrEqual': 'Veuillez selectionner une date valide',
})
