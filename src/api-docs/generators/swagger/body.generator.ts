import {getData} from "../../helpers/get-data";
import {MetadataKeys} from "../../enums/metadata-keys";
import {BodyModes} from "../../enums/body-modes";
import {iterateBody} from "../../helpers/body";

export default function generateBody(target: any, key: string) {
  let mode: BodyModes | undefined = getData(MetadataKeys.BodyMode, target, key)
  let body: any | undefined = getData(MetadataKeys.Body, target, key)

  if (!mode || !body) {
    return {}
  }

  return {
    content: {
      [getContentType(mode)]: {
        schema: {
          type: 'object',
          properties: iterateBody(body)
        }
      }
    }
  }
}

function getContentType(mode: BodyModes) {
  if (mode === BodyModes.Formdata) {
    return 'multipart/form-data'
  } else {
    return 'application/json'
  }
}
