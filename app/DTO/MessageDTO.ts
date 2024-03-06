import { DateTime } from 'luxon'

export interface CreateMessageDTO {
  id?: number
  message: string
  date?: DateTime | null
  userId: number
  conversationId: number
}
export interface UpdateMessageDTO {}
