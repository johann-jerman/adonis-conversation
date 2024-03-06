import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const CreateMessageValidator = vine.compile(
  vine.object({
    message: vine.string().trim(),
    date: vine.date(),
    // userId: vine.number().exists(async (db, value) => {
    //   const user = await db.from('users').where('id', value).first()
    //   return user
    // }),
    conversationId: vine.number().exists(async (db, value) => {
      const conversation = await db.from('conversations').where('id', value).first()
      return conversation
    }),
  })
)

/**
 * Validates the post's update action
 */
export const UpdateMessageValidator = vine.compile(vine.object({}))
