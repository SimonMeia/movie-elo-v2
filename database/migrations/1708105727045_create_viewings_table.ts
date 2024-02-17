import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'viewings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('viewing_date').notNullable()

      table.integer('review_id').unsigned().references('reviews.id').onDelete('cascade')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
