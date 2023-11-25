import { Op } from "sequelize";

// Models
import getUser from "../../models/User";

//
import { generateController } from "../../lib/generateController";

export const getUserListController = generateController(async (req) => {
  const User = getUser();
  const users = await User.findAll({
    where: {
      [Op.not]: {
        id: req.user.id,
      },
    },
  });

  return {
    message: "Profile fetched successfully",
    payload: { users },
  };
});
