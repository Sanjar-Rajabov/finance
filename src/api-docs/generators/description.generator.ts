import {getData} from "../helpers/get-data";
import {MetadataKeys} from "../enums/metadata-keys";

export function descriptionGenerator(target: any, key?: string): string {
  return getData(MetadataKeys.Description, target, key) ?? ""
}
