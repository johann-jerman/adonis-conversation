import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Type from './Types.js'
import Message from './Messages.js'
import User from './user.js'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare typeId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime()
  declare deletedAt: DateTime | null

  @belongsTo(() => Type)
  declare type: BelongsTo<typeof Type>

  @hasMany(() => Message)
  declare messages: HasMany<typeof Message>

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'conversation_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'user_conversations',
  })
  declare users: ManyToMany<typeof User>
}
