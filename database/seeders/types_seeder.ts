import Type from '#models/Types'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const types = [
      {
        type: 'conversation',
      },
      {
        type: 'group',
      },
      {
        type: 'communiti',
      },
    ]

    await Type.createMany(types)
  }
}
