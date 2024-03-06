import User from '#models/user'
import { CreateUserDTO, UpdateUserDTO } from '../../DTO/UserDTO.js'

export default interface IUserRepository {
  findByEmail(identifier: string): Promise<User>
  findById(identifier: string): Promise<User>
  findBy(identifier: string): Promise<User>
  create(data: CreateUserDTO): Promise<User>
  update(identifier: string, data: UpdateUserDTO): Promise<User>
  delete(identifier: string): Promise<void>
}
