import { Repository } from 'typeorm'
import { AppDataSource } from '../config/database'
import { UserHistory } from '../entities/user-history.entity'
import { Route } from '../entities/route.entity'

export class UserHistoryService {
  private userHistoryRespository: Repository<UserHistory>
  private routeRespostory: Repository<Route>

  constructor() {
    this.routeRespostory = AppDataSource.getRepository(Route)
    this.userHistoryRespository = AppDataSource.getRepository(UserHistory)
  }

  async getUserHistoryRoutes(userId: number): Promise<UserHistory[]> {
    const historyRoutes = await this.userHistoryRespository.find({
      where: { user: { id: userId } },
      relations: ['route', 'user']
    })

    return historyRoutes
  }

  async createUserHistoryRoutes(userId: number, data: UserHistory) {
    if (!userId) {
      throw new Error('Usuario no está registrado.')
    }

    const { route } = data

    const existsUserHistory = await this.userHistoryRespository.findOne({
      where: { route: { name: route.name }, user: { id: userId } }
    })
    if (existsUserHistory) {
      throw new Error('Este usuario ya tiene la ruta como favoritos.')
    }

    let existsRoute = await this.routeRespostory.findOneBy({ name: route.name })
    if (!existsRoute) {
      existsRoute = await this.routeRespostory.save(route)
    }

    const userHistory = await this.userHistoryRespository.save({
      route: existsRoute,
      user: { id: userId }
    })

    return userHistory
  }
}
