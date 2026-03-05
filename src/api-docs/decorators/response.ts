import {ResponseModel} from "../interfaces/response.model";
import {MetadataKeys} from "../enums/metadata-keys";

export function Response(responses: ResponseModel[]) {
  return function (target: any, key: string) {
    let result = Reflect.getMetadata(key + '.' + MetadataKeys.Response, target)

    if (result instanceof Array) {
      responses = result.concat(responses)
    }

    Reflect.defineMetadata(key + '.' + MetadataKeys.Response, responses, target)
  }
}
