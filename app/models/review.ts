import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Review extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tmdbMovieId: number

  @column()
  declare story: number

  @column()
  declare acting: number

  @column()
  declare music: number

  @column()
  declare directing: number

  @column()
  declare feeling: number

  @column()
  declare personal: number

  @column()
  declare locations: string[]

  @column()
  declare partners: string[]

  @column()
  declare date: Date

  @column()
  declare comment: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
