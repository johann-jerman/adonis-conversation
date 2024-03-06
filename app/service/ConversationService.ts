import { inject } from '@adonisjs/core'
import ConversationRepository from '../repositories/Conversation/ConversationRepository.js'
import Conversation from '#models/Conversation'
import { CreateConversationDTO, UpdateConversationDTO } from '../DTO/ConversationDTO.js'

@inject()
export default class ConversationService {
  constructor(protected conversaciontRepository: ConversationRepository) {}

  public async getConversation(id: string): Promise<Conversation> {
    return await this.conversaciontRepository.getConversation(id)
  }

  public async getConversations(params: any): Promise<Conversation[]> {
    return await this.conversaciontRepository.getConversations(params)
  }

  public async crete(data: CreateConversationDTO): Promise<Conversation> {
    return await this.conversaciontRepository.crete(data)
  }

  public async update(data: UpdateConversationDTO, id: string): Promise<Conversation> {
    return await this.conversaciontRepository.update(data, id)
  }

  public async delete(id: string): Promise<void> {
    return await this.conversaciontRepository.delete(id)
  }
}
