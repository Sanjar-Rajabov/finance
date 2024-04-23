import {BaseEntity as Entity, Generated, PrimaryColumn} from "typeorm";
import {bigintToNumber} from "../transformer/bigint-to-number";

export class BaseEntity extends Entity {
  @Generated("increment")
  @PrimaryColumn({
    transformer: bigintToNumber
  })
  id: number
}
