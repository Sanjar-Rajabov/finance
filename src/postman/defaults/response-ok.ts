import {Response} from "../decorators/response";
import {getReasonPhrase, StatusCodes} from "http-status-codes";

export function ResponseOk(body: any = null) {
  return Response([{
    name: getReasonPhrase(StatusCodes.OK),
    statusCode: StatusCodes.OK,
    body: {
      statusCode: StatusCodes.OK,
      statusDesc: getReasonPhrase(StatusCodes.OK),
      data: body
    }
  }])
}
