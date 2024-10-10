import Joi from "joi";
import env from "../../utils/env";
import {ErrorMessages} from "../../errors/error-messages";
import {BaseError} from "../../errors/base.error";
import {StatusCodes} from "http-status-codes";

export function validate(schema: Joi.Schema, data: any): Joi.ValidationResult<any> {
  let result: Joi.ValidationResult<any> = schema.validate(data)

  if (result.error) {
    if (env('APP_ENV') !== 'production') {
      console.log(result.error)
    }

    let message: string = result.error.details[0].message ?? ErrorMessages.validation

    throw new BaseError(message, StatusCodes.UNPROCESSABLE_ENTITY, result.error.details)
  }

  return result
}
