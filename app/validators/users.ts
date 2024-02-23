import User from '#models/user'
import vine from '@vinejs/vine'
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
    field.report('The movie id is not valid', 'movieIdValidityRule', field)
  }
}

const uniqueRule = vine.createRule(isUnique, {
  implicit: true,
  isAsync: true,
})

export const createUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim(),
    lastName: vine.string().trim(),
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
      .use(uniqueRule({ column: 'email' })),
    password: vine.string().trim(),
  })
)
