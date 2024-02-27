import {ResponseModel} from "../interfaces/response.model";
import {MetadataKeys} from "../enums/metadata-keys";

export function Response(responses: ResponseModel[]) {
  return function (target: any, key: string) {
    Reflect.defineMetadata(key + '.' + MetadataKeys.Response, responses, target)
  }
}
