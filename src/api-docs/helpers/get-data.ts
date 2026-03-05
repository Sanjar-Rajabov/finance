import {getMetadata} from "reflect-metadata/no-conflict";

export function getData(metadataKey: string, target: any, key?: string) {
  if (key) {
    return getMetadata(`${key}.${metadataKey}`, target)
  } else {
    return getMetadata(metadataKey, target)
  }
}