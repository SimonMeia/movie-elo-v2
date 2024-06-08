import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
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
  declare viewings: HasMany<typeof Viewing>

  @manyToMany(() => Grade)
  declare grades: ManyToMany<typeof Grade>

  @belongsTo(() => Movie)
  declare movie: BelongsTo<typeof Movie>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
