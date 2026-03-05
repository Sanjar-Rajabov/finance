import {Response} from "../decorators/response";
import {getReasonPhrase, StatusCodes} from "http-status-codes";

export function ResponseEmpty() {
  return Response([{
    name: getReasonPhrase(StatusCodes.NO_CONTENT),
    statusCode: StatusCodes.NO_CONTENT,
    body: null
  }])
}
