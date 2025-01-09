import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Review from '#models/review'
import Location from '#models/location'
import GradeType from '#models/grade_type'
import Partner from '#models/partner'
import { Opaque } from '@adonisjs/core/types/helpers'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export type UserId = Opaque<'UserId', string>

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: UserId

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare username: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare gradeTypesValidated: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Review)
  declare reviews: HasMany<typeof Review>

  @hasMany(() => Location)
  declare locations: HasMany<typeof Location>

  @hasMany(() => Partner)
  declare partners: HasMany<typeof Partner>

  @hasMany(() => GradeType)
  declare gradeTypes: HasMany<typeof GradeType>

  static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)
}
