import { User } from '../entities/user.entity'

export interface AuthUser extends Omit<User, 'password'> {}
