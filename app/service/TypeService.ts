import { inject } from '@adonisjs/core'
import TypeRepository from '../repositories/Type/TypeRepository.js'
import { CreateTypeDTO } from '../DTO/TypeDTO.js'
import Type from '#models/Types'

@inject()
export default class TypeService {
  constructor(protected typeRepository: TypeRepository) {}
  public async create(data: CreateTypeDTO): Promise<Type> {
    return await this.typeRepository.create(data)
  }
  public async delete(id: string): Promise<void> {
    return await this.typeRepository.delete(id)
  }
}
