import {StatusCodes} from "http-status-codes";
import {ErrorMessages} from "./error-messages";

export class BaseError extends Error {
  constructor(
    message: string = ErrorMessages.internal,
    public statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
    public details: object = {}
  ) {
    super(message)
  }
}
