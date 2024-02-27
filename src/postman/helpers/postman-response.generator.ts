import {getData} from "./get-data";
import {MetadataKeys} from "../enums/metadata-keys";
import {ResponseModel} from "../interfaces/response.model";
import {getReasonPhrase} from "http-status-codes";

export function postmanResponseGenerator(target: any, key: string, request: object) {
  let responses: ResponseModel[] = getData(MetadataKeys.Response, target, key)

  let result = []

  for (let key in responses) {
    let response = responses[key]
    result.push({
      name: response.name,
      originalRequest: request,
      status: getReasonPhrase(response.statusCode),
      code: response.statusCode,
      body: response.body ? JSON.stringify(response.body, null, "\t") : null,
      _postman_previewlanguage: 'json'
    })
  }

  return result
}
