import type { HttpContext } from '@adonisjs/core/http'
import PusherInstance from '../lib/PusherLib.js'

export default class MessageEventsController {
  public async authChannel({ request, response }: HttpContext) {
    try {
      const { socket_id, channel_name } = request.all()
      const auth = PusherInstance.authorizeChannel(socket_id, channel_name)

      return response.send(auth)
    } catch (error) {
      response.badRequest({ error: error.messages || error.message })
    }
  }

  public async authUser({ request, response }: HttpContext) {
    try {
      const socketId = request.input('socket_id')
      const { userInfo } = request.all()
      const presenceData = {
        // user_id: uuidv4(),
        // id: uuidv4(),
        user_id: Math.random(),
        id: '',
        user_info: userInfo,
      }
      const auth = PusherInstance.authenticateUser(socketId, presenceData)

      return response.send(auth)
    } catch (error) {
      response.badRequest({ error: error.messages || error.message })
    }
  }

  public async triggerEvent({ request, response }: HttpContext) {
    try {
      const channel = request.param('channel')
      const { message, event } = request.all()

      PusherInstance.trigger(channel, event, message)

      response.ok({
        success: true,
        message: 'Message sent',
      })
    } catch (error) {
      response.badRequest({ error: error.messages || error.message })
    }
  }

  public async terminateConnection({ request, response }: HttpContext) {
    try {
      const { userId } = request.all()
      PusherInstance.terminateUserConnection(userId)
      return response.noContent()
    } catch (error) {
      response.badRequest({ error: error.messages || error.message })
    }
  }
}
