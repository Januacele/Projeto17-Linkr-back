import Joi from "joi"

export const postSchema = Joi.object({
  shared_url: Joi.string().uri().required(),
  message: Joi.string()
})

