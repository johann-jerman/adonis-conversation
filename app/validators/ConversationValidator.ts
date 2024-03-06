import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const CreateConversationValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    typeId: vine.number().exists(async (db, value) => {
      const type = await db.from('types').where('id', value).first()
      return type
    }),
    usersId: vine.array(
      vine.object({
        userId: vine.number().exists(async (db, value) => {
          const user = await db.from('users').where('id', value).first()
          return user
        }),
      })
    ),
  })
)

/**
 * Validates the post's update action
 */
export const UpdateConversationValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
  })
)
