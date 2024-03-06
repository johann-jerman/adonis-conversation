import { DateTime } from 'luxon'

export interface CreateUserDTO {
  id?: number
  name: string
  lastname?: string
  email: string
  password: string
  createdAt?: DateTime
  updatedAt?: DateTime | null
  deletedAt?: DateTime | null
}
export interface UpdateUserDTO {
  id?: number
  name?: string
  lastname?: string
  email?: string
  password?: string
  createdAt?: DateTime
  updatedAt?: DateTime | null
  deletedAt?: DateTime | null
}
