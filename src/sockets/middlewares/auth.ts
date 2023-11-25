//
import { verifyToken } from "../../middlewares/auth";
import { SocketMiddleware } from "../types";

export const auth: SocketMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    const user = await verifyToken(token);
    socket.user = user;

    next();
  } catch (e) {
    next(e);
  }
};
