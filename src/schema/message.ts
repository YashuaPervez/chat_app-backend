import joi from "joi";

export const createMessageSchema = joi.object().keys({
  content: joi.string().required(),
  toUserId: joi.number().required(),
});

export const readAllMessagesQuerySchema = joi.object().keys({
  withUserId: joi.number().required(),
});
