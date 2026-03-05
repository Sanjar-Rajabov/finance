import {MetadataKeys} from "../enums/metadata-keys";

export function routeBinder(method: string) {
  return function (path: string, options?: {
    params?: object,
    query?: object,
    headers?: object
  }) {
    return function (target: any, key: string) {
      Reflect.defineMetadata(key + '.' + MetadataKeys.Path, path.charAt(0) === '/' ? path : '/' + path, target)
      Reflect.defineMetadata(key + '.' + MetadataKeys.Method, method, target)

      if (options?.params) {
        Reflect.defineMetadata(key + '.' + MetadataKeys.Params, options.params, target)
      } else if (path.includes(':id')) {
        Reflect.defineMetadata(key + '.' + MetadataKeys.Params, {id: 1}, target)
      }
      if (options?.query) {
        Reflect.defineMetadata(key + '.' + MetadataKeys.Query, options.query, target)
      }
      if (options?.headers) {
        Reflect.defineMetadata(key + '.' + MetadataKeys.Headers, options.headers, target)
      } else {
        Reflect.defineMetadata(key + '.' + MetadataKeys.Headers, {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, target)
      }
    }
  }
}
