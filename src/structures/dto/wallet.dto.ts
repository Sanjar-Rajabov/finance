import {DTO} from "./DTO";

export class WalletDto implements DTO {
  id: number = 1
  name: string = 'wallet 1'
  balance: number = 0
  created_at: string = new Date().toJSON()
  updated_at: string = new Date().toJSON()
}