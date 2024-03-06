import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const users = [
      {
        name: 'jhon',
        lastname: 'doe',
        email: 'jhondoe@gmail.com',
        password: '123',
      },
      {
        name: 'jhon2',
        lastname: 'doe2',
        email: 'jhondoe2@gmail.com',
        password: '123',
      },
    ]

    await User.createMany(users)
  }
}
