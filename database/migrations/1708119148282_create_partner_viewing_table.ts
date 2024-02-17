import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'partner_viewing'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('viewing_id')
        .unsigned()
        .references('viewings.id')
        .notNullable()
        .onDelete('cascade')
      table
        .integer('partner_id')
        .unsigned()
        .references('partners.id')
        .notNullable()
        .onDelete('cascade')
      table.unique(['viewing_id', 'partner_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
