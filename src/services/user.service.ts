import { Repository } from 'typeorm'
import bcrypt from 'bcrypt'
import { AppDataSource } from '../config/database'
import { User } from '../entities/user.entity'
import { AuthUser } from '../types'

export class UserService {
  private userRepository: Repository<User>

  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
  }

  async register(data: User): Promise<User> {
    const { password } = data

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = this.userRepository.create({
      ...data,
      password: hashedPassword
    })

    return this.userRepository.save(user)
  }

  async login(email: string, password: string): Promise<AuthUser | null> {
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user) return null

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) return null

    const { password: _, ...restUserData } = user

    return {
      ...restUserData
    }
  }
}
