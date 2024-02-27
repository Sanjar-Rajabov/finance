import Joi from "joi";

const getByIdJoi = Joi.object({
  id: Joi.number().required()
})

const paginationJoi = Joi.object({
  page: Joi.number().min(0).optional(),
  perPage: Joi.number().min(0).optional()
})

export {
  getByIdJoi, paginationJoi
}