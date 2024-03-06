import UserConversation from '#models/UserConversation'
import { AddUserConversationDTO } from '../../DTO/UserConversationDTO.js'

export default interface IUserConversationRepository {
  add(data: AddUserConversationDTO): Promise<UserConversation>
  delete(id: string, conversationId: string): Promise<void>
}
