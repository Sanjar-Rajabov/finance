import {getData} from "./get-data";
import {MetadataKeys} from "../enums/metadata-keys";

export function postmanDescriptionGenerator(target: any, key?: string): string {
  return getData(MetadataKeys.Description, target, key) ?? ""
}