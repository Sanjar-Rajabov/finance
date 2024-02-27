import {getMetadata} from "reflect-metadata/no-conflict";
import {MetadataKeys} from "../enums/metadata-keys";
import {getData} from "./get-data";

export function postmanUrlGenerator(target: any, key: string) {
  let prefix = getMetadata(MetadataKeys.Prefix, target)
  let path = getData(MetadataKeys.Path, target, key)
  let params = getData(MetadataKeys.Params, target, key)
  let queryParams = getData(MetadataKeys.Query, target, key)

  prefix = prefix.split('/').filter((item: string) => item !== '').join('/')
  path = path.split('/').filter((item: string) => item !== '').join('/')

  let url = `/${prefix}/${path}`

  let paths = url.split('/').filter((item: string) => item !== '')

  let baseUrl = `{{baseUrl}}`;

  let raw = `${baseUrl}/${prefix}/${path}`

  let variable = []
  let query = []

  if (params) {
    for (let key in params) {
      variable.push({
        key: key,
        value: params[key]
      })
    }
  } else if (raw.includes(':id')) {
    variable.push({
      key: 'id',
      value: 1
    })
  }

  if (queryParams) {
    for (let key in queryParams) {
      query.push({
        key: key,
        value: queryParams[key],
        disabled: true
      })
    }
  }

  return {
    raw: raw,
    host: [baseUrl],
    path: paths,
    query: query,
    variable: variable
  };
}