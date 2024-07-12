import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserHistory } from './user-history.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  lastName: string

  @Column({ unique: true, nullable: true })
  username: string

  @Column()
  password: string

  @Column({ unique: true })
  email: string

  @OneToMany(() => UserHistory, userHistory => userHistory.user)
  historyRoutes: UserHistory[]
}
