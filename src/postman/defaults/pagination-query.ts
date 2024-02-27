import {MetadataKeys} from "../enums/metadata-keys";

export function PaginationQuery() {
  return function (target: any, key: string) {
    let metadataKey = key + '.' + MetadataKeys.Query

    Reflect.defineMetadata(metadataKey, {
      page: 1,
      limit: 20
    }, target)
  }
}
