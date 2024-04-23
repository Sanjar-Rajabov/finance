import {Column, CreateDateColumn, Entity, UpdateDateColumn} from "typeorm";
import {dateIsoToDatetime} from "../transformer/date-iso-to-datetime";
import {BaseEntity} from "./base-entity";

@Entity()
export default class Wallet extends BaseEntity {

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
