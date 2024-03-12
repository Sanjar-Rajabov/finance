import {ValueTransformer} from "typeorm";
import {formatDate} from "../../helpers/date";

export const dateIsoToDatetime: ValueTransformer = {
  to: (entityValue: number) => entityValue,
  from: (databaseValue: Date): string => formatDate(databaseValue)
}
