import { ObjectSchema } from "joi";
import { RequestHandler } from "express";

const validate = (schema: ObjectSchema, data: any, notFoundMessage: string) => {
  const hasData = typeof data === "object";
  if (!hasData) {
    throw new Error(notFoundMessage);
  }

  const { error } = schema.validate(data);
  if (error) {
    throw new Error(error.details?.[0]?.message);
  }
};

export const validateBody = (schema: ObjectSchema): RequestHandler => {
  return async (req, res, next) => {
    try {
      validate(schema, req.body, "Body is required");
      next();
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).json({
          message: e.message,
          success: false,
          payload: {},
        });
      }
    }
  };
};

export const validateParams = (schema: ObjectSchema): RequestHandler => {
  return async (req, res, next) => {
    try {
      validate(schema, req.params, "Params are required");
      next();
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).json({
          message: e.message,
          success: false,
          payload: {},
        });
      }
    }
  };
};

export const validateQuery = (schema: ObjectSchema): RequestHandler => {
  return async (req, res, next) => {
    try {
      validate(schema, req.query, "Query is required");
      next();
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).json({
          message: e.message,
          success: false,
          payload: {},
        });
      }
    }
  };
};
