import {ValueTransformer} from "typeorm";

export const bigintToNumber: ValueTransformer = {
  to: (entityValue: number) => entityValue,
  from: (databaseValue: string): number => parseInt(databaseValue, 10)
}