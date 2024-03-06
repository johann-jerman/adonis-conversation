import Message from '#models/Messages'
import { CreateMessageDTO, UpdateMessageDTO } from '../../DTO/MessageDTO.js'
import IMessageRepository from './IMessageRepository.js'

export default class MessageRepository implements IMessageRepository {
  public async getBy(params: any): Promise<Message[]> {
    const { orderBy, conversationId, page, perPage } = params
    return await Message.query()
      .where('conversation_id', conversationId)
      .orderBy('created_at', orderBy)
      .if(page && perPage, (query) => {
        query.paginate(page, perPage)
      })
  }

  public async getById(id: string): Promise<Message> {
    return await Message.query().where('id', id).firstOrFail()
  }

  public async create(data: CreateMessageDTO): Promise<Message> {
    return await Message.create(data)
  }

  public async update(data: UpdateMessageDTO, id: string): Promise<Message> {
    const message = await Message.query().where('id', id).firstOrFail()
    message.merge(data)
    return await message.save()
  }

  public async delete(id: string): Promise<void> {
    await Message.query().where('id', id).delete()
    return
  }
}
