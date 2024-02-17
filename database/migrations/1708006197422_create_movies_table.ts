import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'movies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('tmdb_id').notNullable()
      table.string('title').notNullable()
      table.string('synopsis').notNullable()
      table.date('release_date').notNullable()
      table.integer('runtime').notNullable()
      table.string('backdrop_path').nullable()
      table.string('poster_path').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
