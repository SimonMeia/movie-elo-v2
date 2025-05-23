import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('grade_types_validated').defaultTo(false)
    })
  }

  async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('grade_types_validated')
    })
  }
}
