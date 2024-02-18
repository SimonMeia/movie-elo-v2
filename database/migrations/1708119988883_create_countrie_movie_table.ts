import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'country_movie'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('movie_id').unsigned().references('movies.id').notNullable().onDelete('cascade')
      table
        .integer('country_id')
        .unsigned()
        .references('countries.id')
        .notNullable()
        .onDelete('cascade')
      table.unique(['movie_id', 'country_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
