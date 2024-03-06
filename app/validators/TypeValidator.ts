import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const CreateTypeValidator = vine.compile(
  vine.object({
    type: vine.string().trim(),
  })
)
