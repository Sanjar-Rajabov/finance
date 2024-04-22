import Joi from "joi";

export const getOneValidation: Joi.ObjectSchema = Joi.object({
  id: Joi.number().required()
})

export const paginationValidation: Joi.ObjectSchema = Joi.object({
  page: Joi.number().min(0).optional(),
  limit: Joi.number().min(0).optional()
})

export const localizedObjectValidation: Joi.ObjectSchema = Joi.object({
  ru: Joi.string().required(),
  uz: Joi.string().required(),
  en: Joi.string().required()
})
