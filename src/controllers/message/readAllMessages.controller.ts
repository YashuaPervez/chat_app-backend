import { Op } from "sequelize";

// Models
import getMessage from "../../models/Message";

//
import { generateController } from "../../lib/generateController";

export const readAllMessagesController = generateController(
  async (req, _, raiseException) => {
    const { withUserId } = req.query;

    const user1Id = req.user.id;
    const user2Id = Number(withUserId);

    /**
     * Check user has provided withUserId with a different user than himself
     */
    if (user1Id === user2Id) {
      return raiseException(
        400,
        "Please provide withUserId for a different user than youself"
      );
    }
    const Message = getMessage();

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ fromUserId: user1Id }, { toUserId: user2Id }],
          },
          {
            [Op.and]: [{ fromUserId: user2Id }, { toUserId: user1Id }],
          },
        ],
      },
    });

    return {
      message: "Messages fetched successfully",
      payload: {
        messages,
      },
    };
  }
);
