import Joi from "joi"

export const postSchema = Joi.object({
  shared_url: Joi.string().uri().required(),
  message: Joi.string()
})

export const editPostSchema = Joi.object({
  id: Joi.number().required(),
  user_id: Joi.number().required(),
  message: Joi.string().required()  
})