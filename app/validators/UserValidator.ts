import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const CreateUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    lastname: vine.string().trim().optional(),
    email: vine
      .string()
      .trim()
      .email()
      //@ts-ignore
      .unique(async (db, value, field) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().trim(),
  })
)

/**
 * Validates the post's update action
 */
export const UpdateUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    lastname: vine.string().trim().optional(),
    email: vine
      .string()
      .trim()
      //@ts-ignore
      .unique(async (db, value, field) => {
        const user = await db.query().where('email', value).first()
        return !user
      })
      .optional(),
    password: vine.string().trim().optional(),
  })
)
