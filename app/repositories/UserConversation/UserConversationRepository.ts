import UserConversation from '#models/UserConversation'
import { AddUserConversationDTO } from '../../DTO/UserConversationDTO.js'
import IUserConversationRepository from './IUserConversationRepository.js'

export default class UserConversationRepository implements IUserConversationRepository {
  public async add(data: AddUserConversationDTO): Promise<UserConversation> {
    return await UserConversation.create(data)
  }

  public async delete(id: string, conversationId: string): Promise<void> {
    await UserConversation.query()
      .where('user_id', id)
      .andWhere('conversation_id', conversationId)
      .delete()
    return
  }
}
