import joi from "joi";

export const signupSchema = joi.object().keys({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().required().email(),
  password: joi.string().required(),
});

export const loginSchema = joi.object().keys({
  email: joi.string().required().email(),
  password: joi.string().required(),
});
