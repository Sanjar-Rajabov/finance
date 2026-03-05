import {Response} from "../decorators/response";
import {getReasonPhrase, StatusCodes} from "http-status-codes";

export function ResponseCreated(body: any = null) {
  return Response([{
    name: getReasonPhrase(StatusCodes.CREATED),
    statusCode: StatusCodes.CREATED,
    body: {
      statusCode: StatusCodes.CREATED,
      statusDescription: getReasonPhrase(StatusCodes.CREATED),
      data: body
    }
  }])
}
