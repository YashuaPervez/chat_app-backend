//
import { generateController } from "../../lib/generateController";

export const meController = generateController(async (req) => {
  return {
    message: "Profile fetched successfully",
    payload: { user: req.user },
  };
});
