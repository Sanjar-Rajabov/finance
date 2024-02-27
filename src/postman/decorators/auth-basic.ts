import {MetadataKeys} from "../enums/metadata-keys";
import {AuthTypes} from "../enums/auth-types";

export function AuthBasic(username: string = '{{username}}', password: string = '{{password}}') {
  return function (target: any, key?: string) {
    let authTypeKey: string = MetadataKeys.AuthType;
    let authUsernameKey: string = MetadataKeys.AuthUsername;
    let authPasswordKey: string = MetadataKeys.AuthPassword

    if (key) {
      authTypeKey = `${key}.${MetadataKeys.AuthType}`
      authUsernameKey = `${key}.${MetadataKeys.AuthUsername}`
      authPasswordKey = `${key}.${MetadataKeys.AuthPassword}`
    }

    Reflect.defineMetadata(authTypeKey, AuthTypes.Basic, target)
    Reflect.defineMetadata(authUsernameKey, username, target)
    Reflect.defineMetadata(authPasswordKey, password, target)
  }
}
