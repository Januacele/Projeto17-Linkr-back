import Joi from "joi";

const commentSchema = Joi.object({
  post_id: Joi.number().integer().required(),
  message: Joi.string().max(300).allow('')
});

export default commentSchema;