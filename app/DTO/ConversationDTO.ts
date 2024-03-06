export interface CreateConversationDTO {
  id?: number
  name?: string
  typeId: number
  usersId: usersId[]
}
export interface UpdateConversationDTO {
  name?: string
}

interface usersId {
  userId: number
}
