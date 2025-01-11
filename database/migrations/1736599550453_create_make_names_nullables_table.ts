import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.setNullable('first_name')
      table.setNullable('last_name')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropNullable('first_name')
      table.dropNullable('last_name')
    })
  }
}
