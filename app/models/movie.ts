import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Review from '#models/review'
import MoviePerson from '#models/movie_person'
import Country from '#models/country'
import Genre from '#models/genre'

export default class Movie extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tmdbId: number

  @column()
  declare title: string

  @column()
  declare synopsis: string

  @column.date()
  declare releaseDate: DateTime

  @column()
  declare runtime: number

  @column()
  declare backdropPath: string | null

  @column()
  declare posterPath: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Review)
  declare reviews: HasMany<typeof Review>

  @manyToMany(() => MoviePerson, {
    pivotTable: 'actor_movie',
  })
  declare actors: ManyToMany<typeof MoviePerson>

  @manyToMany(() => MoviePerson, {
    pivotTable: 'director_movie',
  })
  declare directors: ManyToMany<typeof MoviePerson>

  @manyToMany(() => MoviePerson, {
    pivotTable: 'composer_movie',
  })
  declare composers: ManyToMany<typeof MoviePerson>

  @manyToMany(() => Country)
  declare countries: ManyToMany<typeof Country>

  @manyToMany(() => Genre)
  declare genres: ManyToMany<typeof Genre>
}
