import Type from '#models/Types'
import { CreateTypeDTO } from '../../DTO/TypeDTO.js'
import ITypeRepository from './ITypeRepository.js'

export default class TypeRepository implements ITypeRepository {
  public async create(data: CreateTypeDTO): Promise<Type> {
    return await Type.create(data)
  }

  public async delete(id: string): Promise<void> {
    await Type.query().where('id', id).delete()
    return
  }
}
