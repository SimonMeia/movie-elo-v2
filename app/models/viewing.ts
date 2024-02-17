import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Review from '#models/review'
import Location from '#models/location'
import Partner from '#models/partner'

export default class Viewing extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.date()
  declare viewingDate: DateTime

  @column()
  declare reviewId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Review)
  declare review: BelongsTo<typeof Review>

  @manyToMany(() => Location)
  declare locations: ManyToMany<typeof Location>

  @manyToMany(() => Partner)
  declare partners: ManyToMany<typeof Partner>
}
