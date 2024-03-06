import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import UserConversationService from '../service/UserConversationService.js'
import { AddUserConversationValidator } from '#validators/UserConversationValidator'

@inject()
export default class UserConversationController {
  constructor(protected userConversationService: UserConversationService) {}

  public async create({ request, response, auth }: HttpContext) {
    try {
      const data = await request.validateUsing(AddUserConversationValidator)
      //@ts-ignore
      data.userId = auth.user?.id
      //@ts-ignore
      const a = await this.userConversationService.create(data)

      response.status(200).json({
        data: a,
      })
    } catch (error) {
      response.badRequest({ error: error.messages || error.message })
    }
  }

  public async delete({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(AddUserConversationValidator)
      //@ts-ignore
      data.userId = auth.user?.id
      //@ts-ignore
      const a = await this.userConversationService.delete(data.userId, data.conversationId)

      response.status(200).json({
        data: a,
      })
    } catch (error) {
      response.badRequest({ error: error.messages || error.message })
    }
  }
}
