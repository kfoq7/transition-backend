import { Repository } from 'typeorm'
import bcrypt from 'bcrypt'
import { AppDataSource } from '../config/database'
import { User } from '../entities/user.entity'

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

  async login(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } })
    if (!user) return null

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) return null

    return user
  }
}
