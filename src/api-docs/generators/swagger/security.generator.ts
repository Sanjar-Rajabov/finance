import {getData} from "../../helpers/get-data";
import {MetadataKeys} from "../../enums/metadata-keys";
import {AuthTypes} from "../../enums/auth-types";

export default function generateSecurity(target: any, key: string) {
  let authType: AuthTypes | undefined = getData(MetadataKeys.AuthType, target, key)
    || getData(MetadataKeys.AuthType, target)

  if (!authType || authType === AuthTypes.NoAuth) {
    return null
  }

  if (authType === AuthTypes.Basic) {
    return [
      {
        BasicAuth: {}
      }
    ]
  }

  if (authType === AuthTypes.Bearer) {
    return [
      {
        BearerAuth: {}
      }
    ]
  }
}
