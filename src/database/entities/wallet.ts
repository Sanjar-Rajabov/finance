import {BaseEntity, Column, CreateDateColumn, Entity, Generated, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {bigintToNumber} from "../transformer/bigint-to-number";
import {dateIsoToDatetime} from "../transformer/date-iso-to-datetime";

@Entity()
class Wallet extends BaseEntity {
  @Generated("increment")
  @PrimaryColumn({
    transformer: bigintToNumber
  })
  id: number

  @Column({type: 'varchar', length: 100, nullable: false, default: null})
  name: string

  @Column({type: 'int', default: 0})
  balance: number = 0

  @CreateDateColumn({
    transformer: dateIsoToDatetime
  })
  created_at: Date

  @UpdateDateColumn({
    transformer: dateIsoToDatetime
  })
  updated_at: Date
}

export default Wallet