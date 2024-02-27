import {getData} from "./get-data";
import {MetadataKeys} from "../enums/metadata-keys";
import {BodyModes} from "../enums/body-modes";

export function postmanBodyGenerator(target: any, key: string) {
  let mode = getData(MetadataKeys.BodyMode, target, key)
  let body = getData(MetadataKeys.Body, target, key)
  if (!mode) {
    return {}
  }

  let options = {}
  let raw = ''
  let formdata = []

  if (mode === BodyModes.Raw) {
    options = {
      raw: {
        language: 'json'
      }
    }

    raw = JSON.stringify(body, null, "\t")
  } else if (mode === BodyModes.Formdata) {
    for (let key in body) {
      formdata.push({
        key: key,
        value: body[key],
        type: 'text'
      })
    }
  }

  return {
    mode: mode,
    options: options,
    raw: raw,
    formdata: formdata
  }
}
