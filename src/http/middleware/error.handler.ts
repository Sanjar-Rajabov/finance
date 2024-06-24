import {NextFunction, Request, Response} from 'express';
import {ResponseHelper} from "../../utils/response.helper";
import {EntityNotFoundError} from "typeorm";
import env from "../../utils/env";
import {StatusCodes} from "http-status-codes";

export const errorHandler = (
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof EntityNotFoundError) {
    ResponseHelper.error(res, err.message, 404)
  } else if (err.error && err.error.isJoi) {
    ResponseHelper.error(res, err.error.details, StatusCodes.BAD_REQUEST)
  } else {
    console.log(err)
    if (env('ENV', 'dev') == 'dev') {
      ResponseHelper.error(res, err.message, StatusCodes.INTERNAL_SERVER_ERROR)
    } else {
      ResponseHelper.error(res, 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }
};
