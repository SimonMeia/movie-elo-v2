import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Review from '#models/review'
import GradeType from '#models/grade_type'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Grade extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare grade: number

  @column()
  declare gradeTypeId: number

  @column()
  declare reviewId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Review)
  declare review: BelongsTo<typeof Review>

  @belongsTo(() => GradeType)
  declare gradeType: BelongsTo<typeof GradeType>
}
