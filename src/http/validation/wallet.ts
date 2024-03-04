import Joi from "joi";

const createWalletJoi = Joi.object({
  name: Joi.string().required(),
  balance: Joi.number().optional()
})

const updateWalletJoi = Joi.object({
  name: Joi.string().required(),
  balance: Joi.number().optional()
})

export {
  createWalletJoi, updateWalletJoi
}