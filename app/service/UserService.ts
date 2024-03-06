import { inject } from '@adonisjs/core'
import type IUserRepository from '../repositories/User/IUserRepository.js'
import { CreateUserDTO, UpdateUserDTO } from '../DTO/UserDTO.js'
import User from '#models/user'
import UserRepository from '../repositories/User/UserRepository.js'

@inject()
export default class UserService {
  constructor(protected userRepository: UserRepository) {}

  public async findByEmail(identifier: string): Promise<User> {
    return await this.userRepository.findByEmail(identifier)
  }

  public async findById(identifier: string): Promise<User> {
    return await this.userRepository.findById(identifier)
  }

  public async findBy(identifier: string): Promise<User> {
    return await this.userRepository.findBy(identifier)
  }

  public async create(data: CreateUserDTO): Promise<User> {
    return await this.userRepository.create(data)
  }

  public async update(identifier: string, data: UpdateUserDTO): Promise<User> {
    return await this.userRepository.update(identifier, data)
  }

  public async delete(identifier: string): Promise<void> {
    return await this.userRepository.delete(identifier)
  }
}
