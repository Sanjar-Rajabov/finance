import {MetadataKeys} from "../enums/metadata-keys";
import {AuthTypes} from "../enums/auth-types";
import {getData} from "./get-data";

export function postmanAuthGenerator(target: any, key?: string) {
  let type: string

  type = getData(MetadataKeys.AuthType, target, key)

  let result = {}

  if (type === AuthTypes.Bearer) {
    result = {
      type: type,
      bearer: [
        {
          key: 'token',
          value: getData(MetadataKeys.AuthToken, target, key),
          type: 'string'
        }
      ]
    }
  } else if (type === AuthTypes.Basic) {
    result = {
      type: type,
      basic: [
        {
          key: 'username',
          value: getData(MetadataKeys.AuthUsername, target, key),
          type: 'string'
        },
        {
          key: 'password',
          value: getData(MetadataKeys.AuthPassword, target, key),
          type: 'string'
        }
      ]
    }
  } else if (type === AuthTypes.NoAuth) {
    result = {
      type: type
    }
  }

  return result
}