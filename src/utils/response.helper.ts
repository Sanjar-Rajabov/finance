import {Response} from "express";
import {getReasonPhrase, StatusCodes} from "http-status-codes";
import {EntityNotFoundError} from "typeorm";
import {getPaginationResponse} from "./pagination.helper";
import env from "./env";

export class ResponseHelper {
  static pagination<T>(res: Response, data: T[], page: number, limit: number, count: number) {
    return ResponseHelper.success(res, ResponseHelper.paginationObject<T>(data, page, limit, count), StatusCodes.OK)
  }

  static paginationObject<T>(data: T[], page: number, limit: number, count: number) {
    return getPaginationResponse<T>(data, page, limit, count)
  }

  static success(res: Response, data: any = null, statusCode: StatusCodes = StatusCodes.OK) {
    return res.status(statusCode).json(ResponseHelper.successObject(data, statusCode))
  }

  static error(res: Response, message: string = '', statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR, details: object = {}) {
    return res.status(statusCode).json(
      ResponseHelper.errorObject(message, statusCode, details)
    )
  }

  static validation(res: Response, data: any, statusCode: StatusCodes = StatusCodes.UNPROCESSABLE_ENTITY) {
    return ResponseHelper.error(res, data, statusCode)
  }

  static async catchError(res: Response, error: any) {
    let statusCode: StatusCodes
    let message: string

    if (error instanceof EntityNotFoundError) {
      statusCode = StatusCodes.NOT_FOUND
      message = error.message ?? getReasonPhrase(statusCode)
    } else {
      console.log(error)
      statusCode = error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR
      message = error.message ?? getReasonPhrase(statusCode)
      if (error.message && (env('APP_ENV') !== 'prod' || !(statusCode < 500))) {
        message = error.message
      }
    }

    return ResponseHelper.error(res, message, statusCode, error?.details)
  }

  static successObject(data: any = null, statusCode: StatusCodes = StatusCodes.OK) {
    return {
      statusCode: statusCode,
      statusDescription: getReasonPhrase(statusCode),
      data: data
    }
  }

  static errorObject(message: string = '', statusCode: StatusCodes = StatusCodes.OK, details: object = {}) {
    return {
      statusCode: statusCode,
      statusDescription: getReasonPhrase(statusCode),
      message: message,
      details: details
    }
  }
}
