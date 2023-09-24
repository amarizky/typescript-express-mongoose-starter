import Joi from 'joi';

export const createUserValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(9).max(32).required(),
});

export const updateUserValidation = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(9).max(32),
});
