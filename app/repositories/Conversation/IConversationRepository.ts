import Conversation from '#models/Conversation'
import { CreateConversationDTO, UpdateConversationDTO } from '../../DTO/ConversationDTO.js'

export default interface IConversationRepository {
  getConversations(params: any): Promise<Conversation[]>
  getConversation(id: string): Promise<Conversation>
  crete(data: CreateConversationDTO): Promise<Conversation>
  update(data: UpdateConversationDTO, id: string): Promise<Conversation>
  delete(id: string): Promise<void>
}
