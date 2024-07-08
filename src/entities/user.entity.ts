import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  lastName: string

  @Column()
  username: string

  @Column()
  password: string

  @Column({ unique: true, nullable: true })
  email: string
}
