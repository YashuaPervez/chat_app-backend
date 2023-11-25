//
import { generateController } from "../../lib/generateController";

export const logoutController = generateController(
  async (req, res, raiseException) => {
    res.clearCookie("token");

    return {
      message: "Logged out successfully",
      payload: {},
    };
  }
);
