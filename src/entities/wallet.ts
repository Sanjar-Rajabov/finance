import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'varchar', length: 100, nullable: false, default: null})
  name: string

  @Column({type: 'int', default: 0})
  balance: number = 0

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true})
  created_at: string

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true})
  updated_at: string
}

export default Wallet