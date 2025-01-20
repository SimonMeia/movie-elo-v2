import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

/**
 * Options accepted by the unique rule
 */
type Options = {}

/**
 * Implementation
 */
function isPasswordComplex(value: unknown, _options: Options, field: FieldContext) {
  if (typeof value !== 'string') return

  if (value.length < 8) {
    field.report('Le mot de passe doit contenir au moins 8 caractères', 'password', field)
  }

  if (!/[A-Z]/.test(value)) {
    field.report('Le mot de passe doit contenir au moins 1 majuscule', 'password', field)
  }

  if (!/[a-z]/.test(value)) {
    field.report('Le mot de passe doit contenir au moins 1 minuscule', 'password', field)
  }

  if (!/[0-9]/.test(value)) {
    field.report('Le mot de passe doit contenir au moins 1 chiffre', 'password', field)
  }
}

export const passwordRule = vine.createRule(isPasswordComplex)
