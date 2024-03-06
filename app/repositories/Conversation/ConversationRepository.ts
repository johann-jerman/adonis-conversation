import Conversation from '#models/Conversation'
import { DateTime } from 'luxon'
import { CreateConversationDTO, UpdateConversationDTO } from '../../DTO/ConversationDTO.js'
import IConversationRepository from './IConversationRepository.js'
import UserConversation from '#models/UserConversation'

export default class ConversationRepository implements IConversationRepository {
  public async getConversations(params: any): Promise<Conversation[]> {
    const { userId, page, perPage } = params
    return await Conversation.query()
      .whereHas('users', (query) => {
        query.where('user_id', userId)
      })
      .preload('users')
      .preload('messages', (query) => {
        query.limit(1)
        query.orderBy('created_at', 'desc')
      })
      .preload('type')
      .orderBy('created_at', 'desc')
      .if(page && perPage, (query) => {
        query.paginate(page, perPage)
      })
  }

  public async getConversation(id: string): Promise<Conversation> {
    return await Conversation.query()
      .where('id', id)
      //@ts-ignore
      .andWhere('deleted_at', null)
      .preload('type')
      .preload('users')
      .firstOrFail()
  }

  public async crete(data: CreateConversationDTO): Promise<Conversation> {
    const { usersId, ...payload } = data
    const conversation = await Conversation.create(payload)
    if (usersId) {
      const userIdPayload = usersId?.map((user) => {
        return {
          userId: user.userId,
          conversationId: conversation.id,
        }
      })
      await UserConversation.createMany(userIdPayload)
    }
    return conversation
  }

  public async update(data: UpdateConversationDTO, id: string): Promise<Conversation> {
    const conversation = await Conversation.query().where('id', id).firstOrFail()
    conversation.merge(data)
    return await conversation.save()
  }

  public async delete(id: string): Promise<void> {
    const conversation = await Conversation.query().where('id', id).firstOrFail()
    conversation.merge({
      deletedAt: DateTime.now(),
    })
    await conversation.save()
    return
  }
}
