import {MetadataKeys} from "../enums/metadata-keys";

export function Body(body: object, type: string = 'raw') {
  return function (target: any, key: string) {
    Reflect.defineMetadata(key + '.' + MetadataKeys.Body, body, target)
    Reflect.defineMetadata(key + '.' + MetadataKeys.BodyMode, type, target)
  }
}
