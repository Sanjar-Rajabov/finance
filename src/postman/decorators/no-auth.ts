import {MetadataKeys} from "../enums/metadata-keys";
import {AuthTypes} from "../enums/auth-types";

export function NoAuth() {
  return function (target: any, key?: string) {
    let authTypeKey: string = MetadataKeys.AuthType;

    if (key) {
      authTypeKey = `${key}.${MetadataKeys.AuthType}`
    }

    Reflect.defineMetadata(authTypeKey, AuthTypes.NoAuth, target)
  }
}
