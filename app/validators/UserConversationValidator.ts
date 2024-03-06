import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const AddUserConversationValidator = vine.compile(
  vine.object({
    // usersId: vine.number().exists(async (db, value) => {
    //   const user = await db.from('users').where('id', value).first()
    //   return user
    // }),
    conversationId: vine.number().exists(async (db, value) => {
      const conversation = await db.from('conversations').where('id', value).first()
      return conversation
    }),
  })
)
