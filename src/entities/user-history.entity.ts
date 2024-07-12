import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './user.entity'
import { Route } from './route.entity'

@Entity()
export class UserHistory {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => User, user => user.historyRoutes)
  user: User

  @ManyToOne(() => Route)
  route: Route

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
