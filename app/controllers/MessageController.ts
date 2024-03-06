import type { HttpContext } from '@adonisjs/core/http'
import MessageService from '../service/MessageService.js'
import { inject } from '@adonisjs/core'
import { CreateMessageValidator } from '#validators/MessageValidator'

@inject()
export default class MessageController {
  constructor(protected messageService: MessageService) {}

  public async index({ request, response }: HttpContext) {
    try {
      const { orderBy, page, perPage } = request.qs()
      const { conversationId } = request.params()
      const params = {
        orderBy: orderBy || 'desc',
        conversationId,
        page,
        perPage,
      }
      const messages = await this.messageService.getBy(params)

      response.status(200).json({
        data: messages,
      })
    } catch (error) {
      response.badRequest({ error: error.messages || error.message })
    }
  }

  public async show({ request, response }: HttpContext) {
    try {
      const { id } = request.params()
      const message = this.messageService.getById(id)

      response.status(200).json({
        data: message,
      })
    } catch (error) {
      response.badRequest({ error: error.messages || error.message })
    }
  }

  public async store({ request, response, auth }: HttpContext) {
    try {
      const data = await request.validateUsing(CreateMessageValidator)
      //@ts-ignore
      data.userId = auth.user.id
      //@ts-ignore
      const message = await this.messageService.create(data)

      response.status(200).json({
        data: message,
      })
    } catch (error) {
      response.badRequest({ error: error.messages || error.message })
    }
  }

  //por ahi no se usa
  // public async update({ request, response }: HttpContext) {
  //   try {
  //   } catch (error) {
  //     response.badRequest({ error: error.messages || error.message })
  //   }
  // }

  public async delete({ request, response }: HttpContext) {
    try {
      const { id } = request.params()
      await this.messageService.delete(id)

      response.noContent()
    } catch (error) {
      response.badRequest({ error: error.messages || error.message })
    }
  }
}
