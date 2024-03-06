import { LoginValidator } from '#validators/AuthValidator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AuthService from '../service/AuthService.js'

@inject()
export default class AuthController {
  constructor(protected authService: AuthService) {}

  //TODO: mailer 2fp
  public async login({ request, response }: HttpContext) {
    try {
      const { identifier, password } = await request.validateUsing(LoginValidator)
      const token = await this.authService.login(identifier, password)

      response.status(200).json({
        type: token.type,
        token: token.value?.release(),
        abilities: token.abilities,
        expiredAt: token.expiresAt,
      })
    } catch (error) {
      response.badRequest({ error: error.messages || error.message })
    }
  }

  public async logout({ request, response }: HttpContext) {
    try {
      const { token, identifier } = request.all()
      const deletedToken = await this.authService.logout(token, identifier)

      response.status(200).json({
        data: deletedToken,
      })
    } catch (error) {
      response.badRequest({ error: error.messages || error.message })
    }
  }

  //TODO: mailer first
  public async forgotPassword({ request, response }: HttpContext) {
    try {
      request
    } catch (error) {
      response.badRequest({ error: error.messages || error.message })
    }
  }
}
