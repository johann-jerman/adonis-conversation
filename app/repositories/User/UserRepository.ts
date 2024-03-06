import User from '#models/user'
import { DateTime } from 'luxon'
import { CreateUserDTO, UpdateUserDTO } from '../../DTO/UserDTO.js'
import IUserRepository from './IUserRepository.js'

export default class UserRepository implements IUserRepository {
  public async findByEmail(identifier: string): Promise<User> {
    return await User.query().where('email', identifier).firstOrFail()
  }

  public async findBy(identifier: string): Promise<User> {
    return await User.query().where('id', identifier).orWhere('email', identifier).firstOrFail()
  }

  public async findById(identifier: string): Promise<User> {
    return await User.query().where('id', identifier).firstOrFail()
  }

  public async create(data: CreateUserDTO): Promise<User> {
    return await User.create(data)
  }

  public async update(identifier: string, data: UpdateUserDTO): Promise<User> {
    const user = await User.query()
      .where('id', identifier)
      .orWhere('email', identifier)
      .firstOrFail()
    user.merge(data)
    return await user.save()
  }

  public async delete(identifier: string): Promise<void> {
    const user = await User.query()
      .where('id', identifier)
      .orWhere('email', identifier)
      .firstOrFail()
    user.merge({
      deletedAt: DateTime.now(),
    })
    await user.save()
    return
  }
}
