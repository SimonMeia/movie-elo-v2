import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reviews'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('story').notNullable()
      table.integer('acting').notNullable()
      table.integer('music').notNullable()
      table.integer('directing').notNullable()
      table.integer('feeling').notNullable()
      table.integer('personal').notNullable()
      table.string('comment').nullable()
      table.integer('elo').defaultTo(1000)

      table.integer('user_id').unsigned().references('users.id').onDelete('cascade').notNullable()
      table.integer('movie_id').unsigned().references('movies.id').onDelete('cascade').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
