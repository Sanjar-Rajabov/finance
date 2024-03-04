import {MetadataKeys} from "../enums/metadata-keys";

export function Description(description: string) {
  return function (target: any, key?: string) {
    if (key) {
      Reflect.defineMetadata(key + '.' + MetadataKeys.Description, description, target)
    }
    Reflect.defineMetadata(MetadataKeys.Description, description, target)
  }
}
