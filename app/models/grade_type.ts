import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { type BelongsTo, type HasMany } from '@adonisjs/lucid/types/relations'
import Grade from '#models/grade'
import User, { type UserId } from '#models/user'

export default class GradeType extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare maxGrade: number

  @column()
  declare userId: UserId

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Grade)
  declare grades: HasMany<typeof Grade>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
