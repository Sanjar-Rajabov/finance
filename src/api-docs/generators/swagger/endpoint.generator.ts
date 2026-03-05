import {getData} from "../../helpers/get-data";
import {MetadataKeys} from "../../enums/metadata-keys";

export default function generateEndpoint(target: any, key: string) {
  const prefix: string | undefined = getData(MetadataKeys.Prefix, target)
  const folder: string | undefined = getData(MetadataKeys.PostmanFolder, target)
  const path: string | undefined = getData(MetadataKeys.Path, target, key)

  return ('/' + (prefix || folder || '') + path).replace('//', '/')
}
