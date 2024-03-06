import Type from '#models/Types'
import { CreateTypeDTO } from '../../DTO/TypeDTO.js'

export default interface ITypeRepository {
  create(data: CreateTypeDTO): Promise<Type>
  delete(id: string): Promise<void>
}
