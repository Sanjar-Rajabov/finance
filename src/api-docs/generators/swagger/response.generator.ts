import {ResponseModel} from "../../interfaces/response.model";
import {getData} from "../../helpers/get-data";
import {MetadataKeys} from "../../enums/metadata-keys";
import {iterateBody} from "../../helpers/body";

export default function generateResponse(target: any, key: string) {
  const responses: ResponseModel[] = getData(MetadataKeys.Response, target, key) || []

  if (!responses || responses.length === 0) {
    return {};
  }

  let result: any = {};

  for (let response of responses) {
    result[response.statusCode.toString()] = {
      description: response.name,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: iterateBody(response.body)
          }
        }
      }
    };
  }

  return result
}
