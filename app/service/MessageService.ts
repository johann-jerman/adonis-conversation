import Message from '#models/Messages'
import { inject } from '@adonisjs/core'
import MessageRepository from '../repositories/Message/MessageRepository.js'
import { CreateMessageDTO, UpdateMessageDTO } from '../DTO/MessageDTO.js'

@inject()
export default class MessageService {
  constructor(protected messageRepository: MessageRepository) {}

  public async getBy(params: any): Promise<Message[]> {
    return await this.messageRepository.getBy(params)
  }

  public async getById(id: string): Promise<Message> {
    return await this.messageRepository.getById(id)
  }

  public async create(data: CreateMessageDTO): Promise<Message> {
    return await this.messageRepository.create(data)
  }

  public async update(data: UpdateMessageDTO, id: string): Promise<Message> {
    return await this.messageRepository.update(data, id)
  }

  public async delete(id: string): Promise<void> {
    return await this.messageRepository.delete(id)
  }
}
