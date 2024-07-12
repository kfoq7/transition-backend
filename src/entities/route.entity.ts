import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Route {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 100, unique: true })
  name: string

  @Column('text', { nullable: true })
  description: string
}
