import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import ConversationService from '../service/ConversationService.js'
import {
  CreateConversationValidator,
  UpdateConversationValidator,
} from '#validators/ConversationValidator'

@inject()
export default class ConversationController {
  constructor(protected conversationService: ConversationService) {}

  public async getConversation({ request, response }: HttpContext) {
    try {
      const { id } = request.params()
      const conversation = await this.conversationService.getConversation(id)

      response.status(200).json({
        data: conversation,
      })
    } catch (error) {
      response.badRequest({ error: error.mensages || error.mensage })
    }
  }

  public async getConversations({ request, response, auth }: HttpContext) {
    try {
      const userId = auth.user?.id
      const { page, perPage } = request.qs()
      const params = {
        userId,
        page,
        perPage,
      }

      const conversations = await this.conversationService.getConversations(params)

      response.status(200).json({
        data: conversations,
      })
    } catch (error) {
      response.badRequest({ error: error.mensages || error.mensage })
    }
  }

  public async crete({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(CreateConversationValidator)
      const conversation = await this.conversationService.crete(data)

      response.status(200).json({
        data: conversation,
      })
    } catch (error) {
      response.badRequest({ error: error.mensages || error.mensage })
    }
  }

  public async update({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(UpdateConversationValidator)
      const { id } = request.params()
      const conversation = await this.conversationService.update(data, id)

      response.status(200).json({
        data: conversation,
      })
    } catch (error) {
      response.badRequest({ error: error.mensages || error.mensage })
    }
  }

  public async delete({ request, response }: HttpContext) {
    try {
      const { id } = request.params()
      await this.conversationService.delete(id)

      response.noContent()
    } catch (error) {
      response.badRequest({ error: error.mensages || error.mensage })
    }
  }
}
