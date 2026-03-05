import {MetadataKeys} from "../../enums/metadata-keys";
import {mapType} from "../../helpers/type";
import {getData} from "../../helpers/get-data";

enum ParamType {
  query = 'query',
  path = 'path',
  header = 'header'
}

export default function generateParams(target: any, key: any) {
  const params: object[] = []

  const path: { [key: string]: string } | undefined = getData(MetadataKeys.Params, target, key)
  const query: { [key: string]: string } | undefined = getData(MetadataKeys.Query, target, key)
  const headers: { [key: string]: string } | undefined = getData(MetadataKeys.Headers, target, key)

  if (path) {
    for (let key in path) {
      params.push({
        name: key,
        in: ParamType.path,
        required: true,
        schema: {
          type: mapType(path[key]),
          default: path[key]
        }
      })
    }
  }

  if (query) {
    for (let key in query) {
      params.push({
        name: key,
        in: ParamType.query,
        schema: {
          type: mapType(query[key]),
          default: query[key]
        }
      })
    }
  }

  if (headers) {
    for (let key in headers) {
      params.push({
        name: key,
        in: ParamType.header,
        schema: {
          type: 'string',
          default: headers[key]
        }
      })
    }
  }

  return params
}
