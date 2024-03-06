import { inject } from '@adonisjs/core'
import UserConversationRepository from '../repositories/UserConversation/UserConversationRepository.js'
import { AddUserConversationDTO } from '../DTO/UserConversationDTO.js'
import UserConversation from '#models/UserConversation'

@inject()
export default class UserConversationService {
  constructor(protected userConversationRepository: UserConversationRepository) {}

  public async create(data: AddUserConversationDTO): Promise<UserConversation> {
    return await this.userConversationRepository.add(data)
  }

  public async delete(userid: string, conversationId: string): Promise<void> {
    return await this.userConversationRepository.delete(userid, conversationId)
  }
}
