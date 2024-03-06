import Pusher from 'pusher'
import Env from '#start/env'

export default class PusherInstance {
  private static instance: Pusher

  private constructor() {}

  public static getInstance(): Pusher {
    if (!PusherInstance.instance) {
      PusherInstance.instance = new Pusher({
        appId: Env.get('PUSHER_APP_ID', ''),
        key: Env.get('PUSHER_APP_KEY', ''),
        secret: Env.get('PUSHER_APP_SECRET', ''),
        cluster: Env.get('PUSHER_APP_CLUSTER', ''),
        useTLS: Env.get('PUSHER_APP_TLS'),
      })
    }

    return PusherInstance.instance
  }

  public static trigger(channel: string, event: string, data: any) {
    PusherInstance.getInstance().trigger(channel, event, data)
  }

  public static authenticateUser(socketId: string, presenceData: any) {
    return PusherInstance.getInstance().authenticateUser(socketId, presenceData)
  }

  public static authorizeChannel(socketId: string, channel: string) {
    return PusherInstance.getInstance().authorizeChannel(socketId, channel)
  }

  public static terminateUserConnection(userId: string) {
    PusherInstance.getInstance().terminateUserConnections(userId)
  }
}
