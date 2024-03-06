import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'messages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.text('message').notNullable()
      table.dateTime('date')
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id')
      table.integer('conversation_id').unsigned().notNullable()
      table.foreign('conversation_id').references('conversations.id').onDelete('CASCADE')

      table.dateTime('created_at').notNullable()
      table.dateTime('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
