import User from '#models/user'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

type Options = {
  column: string
}

async function isUnique(value: unknown, options: Options, field: FieldContext) {
  if (typeof value !== 'string') {
    return
  }
  const row = await User.query().where(options.column, value).first()
  if (row) {
    if (options.column === 'username') {
      field.report("Le nom d'utilisateur est déjà utilisé", 'username', field)
    } else if (options.column === 'email') {
      field.report("L'adresse email est déjà utilisée", 'email', field)
    }
  }
}

const uniqueRule = vine.createRule(isUnique, {
  implicit: true,
  isAsync: true,
})

export const createUserValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .use(
        uniqueRule({
          column: 'username',
        })
      ),
    email: vine
      .string()
      .trim()
      .use(uniqueRule({ column: 'email' }))
      .email(),
    password: vine.string().trim(),
  })
)

createUserValidator.messagesProvider = new SimpleMessagesProvider({
  'firstName.required': 'Le prénom est obligatoire',
  'lastName.required': 'Le nom est obligatoire',
  'username.required': "Le nom d'utilisateur est obligatoire",
  'username.uniqueRule': "Le nom d'utilisateur est déjà utilisé",
  'email.required': "L'adresse email est obligatoire",
  'email.uniqueRule': "L'adresse email est déjà utilisée",
  'password.required': 'Le mot de passe est obligatoire',
})
