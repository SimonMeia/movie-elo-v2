import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'movie_review'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('movie_id').unsigned().references('movies.id').onDelete('cascade').notNullable()
      table
        .integer('review_id')
        .unsigned()
        .references('reviews.id')
        .onDelete('cascade')
        .notNullable()
      table.unique(['movie_id', 'review_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
