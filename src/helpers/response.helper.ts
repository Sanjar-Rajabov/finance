import {Response} from "express";
import {getReasonPhrase, StatusCodes} from "http-status-codes";

export class ResponseHelper {

  static async catchError(res: Response, error: any) {
    let statusCode = error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR

    return ResponseHelper.error(res, error.message ?? getReasonPhrase(statusCode), statusCode)
  }

  static success(res: Response, data: any = null, statusCode: StatusCodes = StatusCodes.OK) {
    return res.status(statusCode).json(ResponseHelper.successObject(data, statusCode))
  }

  static error(res: Response, message: string = '', statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR) {
    return res.status(statusCode).json(ResponseHelper.errorObject(message, statusCode))
  }

  static validation(res: Response, data: any, statusCode: StatusCodes = StatusCodes.UNPROCESSABLE_ENTITY) {
    return ResponseHelper.error(res, data, statusCode)
  }

  static successObject(data: any = null, statusCode: StatusCodes = StatusCodes.OK) {
    return {
      statusCode: statusCode,
      statusDescription: getReasonPhrase(statusCode),
      data: data
    }
  }

  static errorObject(message: string = '', statusCode: StatusCodes = StatusCodes.OK) {
    return {
      statusCode: statusCode,
      statusDescription: getReasonPhrase(statusCode),
      message: message
    }
  }
}
