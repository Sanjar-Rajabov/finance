import {getData} from "./get-data";
import {MetadataKeys} from "../enums/metadata-keys";

export function postmanHeaderGenerator(target: any, key: string) {
  let headers = getData(MetadataKeys.Headers, target, key)

  let result = []
  for (let key in headers) {
    result.push({
      key: key,
      value: headers[key],
      type: 'text'
    })
  }

  return result
}