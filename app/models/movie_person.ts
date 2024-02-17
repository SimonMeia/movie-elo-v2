import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Movie from '#models/movie'

export default class MoviePerson extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tmdbId: number

  @column()
  declare name: string

  @column()
  declare profilePath: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Movie)
  declare movies: ManyToMany<typeof Movie>
}
