import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const LoginValidator = vine.compile(
  vine.object({
    identifier: vine
      .string()
      .trim()
      //@ts-ignore
      .exists(async (db, value, field) => {
        const user = await db.from('users').where('email', value).orWhere('name', value).first()

        return user
      }),
    password: vine.string().trim(),
  })
)

/**
 * Validates the post's update action
 */
export const LogoutValidator = vine.compile(
  vine.object({
    identifier: vine
      .string()
      .trim()
      //@ts-ignore
      .exists(async (db, value, field) => {
        const user = await db.from('users').where('email', value).orWhere('name', value).first()

        return user
      }),
    token: vine.string().trim(),
  })
)
