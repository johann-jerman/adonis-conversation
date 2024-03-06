import { inject } from '@adonisjs/core'
import UserService from './UserService.js'
import User from '#models/user'
import { AccessToken } from '@adonisjs/auth/access_tokens'

@inject()
export default class AuthService {
  constructor(protected userService: UserService) {}

  //TODO: store in redis
  public async login(identifier: string, password: string): Promise<AccessToken> {
    const user = await User.verifyCredentials(identifier, password)
    if (!user) throw new Error('debes logearte con un usuario existente')

    return await this.generateToken(user)
  }

  public async logout(token: AccessToken, identifier: string): Promise<number> {
    const user = await this.userService.findBy(identifier)

    if (!user) throw new Error('debes logearte con un usuario existente')

    return await User.accessTokens.delete(user, token.identifier)
  }

  //TODO: generar permisos de admin y user etc
  public async generateToken(user: User): Promise<AccessToken> {
    return await User.accessTokens.create(user)
  }
}
