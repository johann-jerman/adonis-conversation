import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'conversations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name')
      table.integer('max_members')
      table.integer('type_id').unsigned().notNullable()
      table.foreign('type_id').references('types.id')

      table.dateTime('created_at').notNullable()
      table.dateTime('updated_at').nullable()
      table.dateTime('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
