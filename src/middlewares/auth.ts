import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import getUser from "../models/User";

const { JWT_SECRET = "" } = process.env;

export const verifyToken = async (token: string) => {
  const decoded: any = jwt.verify(token, JWT_SECRET);

  const User = getUser();
  const user = await User.findOne({
    where: {
      id: decoded.id,
    },
  });

  if (!user) {
    throw new Error("Invalid token");
  }

  return user;
};

export const authMiddleware = (): RequestHandler => {
  return async (req, res, next) => {
    try {
      /**
       * Logic to authenticate user
       */
      const token = req.cookies.token;
      if (!token) {
        throw new Error("Authorization header required");
      }

      const user = await verifyToken(token);

      req.user = user;
      req.token = token;

      next();
    } catch (e) {
      if (e instanceof Error) {
        return res.status(401).json({
          message: e.message || "Authentication required",
          payload: {},
        });
      }
    }
  };
};
