import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Route {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 250, unique: true })
  name: string

  @Column('text', { nullable: true })
  description: string

  @Column('decimal', { precision: 10, scale: 8 })
  lat: number

  @Column('decimal', { precision: 11, scale: 8 })
  lon: number
}
