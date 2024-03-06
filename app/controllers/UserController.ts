import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import UserService from '../service/UserService.js'
import { CreateUserValidator, UpdateUserValidator } from '#validators/UserValidator'

@inject()
export default class UserController {
  constructor(protected userService: UserService) {}

  public async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(CreateUserValidator)
      const user = await this.userService.create(data)

      response.status(200).json({
        data: user,
      })
    } catch (error) {
      response.badRequest({ error: error.messages || error.message })
    }
  }

  //from here need authentication to use this endpoints
  public async show({ request, response }: HttpContext) {
    try {
      const { identifier } = request.params()
      const user = await this.userService.findBy(identifier)

      response.status(200).json({
        data: user,
      })
    } catch (error) {
      response.badRequest({ error: error.messages || error.message })
    }
  }

  public async update({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(UpdateUserValidator)
      const { identifier } = request.params()
      const user = await this.userService.update(identifier, data)

      response.status(200).json({
        data: user,
      })
    } catch (error) {
      response.badRequest({ error: error.messages || error.message })
    }
  }

  public async delete({ request, response }: HttpContext) {
    try {
      const { identifier } = request.params()
      await this.userService.delete(identifier)
      response.noContent()
    } catch (error) {
      response.badRequest({ error: error.messages || error.message })
    }
  }
}
