import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import TypeService from '../service/TypeService.js'
import { CreateTypeValidator } from '#validators/TypeValidator'

@inject()
export default class TypeController {
  constructor(protected typeService: TypeService) {}

  public async create({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(CreateTypeValidator)
      const type = await this.typeService.create(data)

      response.status(200).json({
        data: type,
      })
    } catch (error) {
      response.badRequest({ error: error.messages || error.message })
    }
  }

  public async delete({ request, response }: HttpContext) {
    try {
      const { id } = request.params()
      await this.typeService.delete(id)

      response.noContent()
    } catch (error) {
      response.badRequest({ error: error.messages || error.message })
    }
  }
}
