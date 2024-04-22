import Joi from "joi";

export const walletValidation: Joi.ObjectSchema = Joi.object({
  name: Joi.string().required(),
  balance: Joi.number().optional()
})
