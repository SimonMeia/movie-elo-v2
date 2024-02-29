import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Movie from '#models/movie'
import Viewing from '#models/viewing'
import Grade from '#models/grade'
import User, { type UserId } from '#models/user'

export default class Review extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare comment: string | null

  @column()
  declare elo: number

  @column()
  declare movieId: number

  @column()
  declare userId: UserId

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Viewing)
  declare viewngs: HasMany<typeof Viewing>

  @hasMany(() => Grade)
  declare grades: HasMany<typeof Grade>

  @belongsTo(() => Movie)
  declare movie: BelongsTo<typeof Movie>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
