import {Response} from "../decorators/response";
import {getReasonPhrase, StatusCodes} from "http-status-codes";

export function ResponseOk(body: any = null, wrap: boolean = true) {
  let result = {
    name: getReasonPhrase(StatusCodes.OK),
    statusCode: StatusCodes.OK,
    body: body
  }

  if (wrap) {
    result.body = {
      statusCode: StatusCodes.OK,
      statusDesc: getReasonPhrase(StatusCodes.OK),
      data: body
    }
  }

  return Response([result])
}
