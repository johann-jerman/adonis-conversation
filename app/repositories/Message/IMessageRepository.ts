import Message from '#models/Messages'
import { CreateMessageDTO, UpdateMessageDTO } from '../../DTO/MessageDTO.js'

export default interface IMessageRepository {
  getBy(params: any): Promise<Message[]>
  getById(id: string): Promise<Message>
  create(data: CreateMessageDTO): Promise<Message>
  update(data: UpdateMessageDTO, id: string): Promise<Message>
  delete(id: string): Promise<void>
}
