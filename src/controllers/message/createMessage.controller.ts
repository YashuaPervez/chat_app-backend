// Models
import getUser from "../../models/User";
import getMessage from "../../models/Message";

//
import { generateController } from "../../lib/generateController";

export const createMessageController = generateController(
  async (req, _, raiseException) => {
    const { content, toUserId } = req.body;

    /**
     * Check user is not sending message to him self
     */
    if (req.user.dataValues.id === toUserId) {
      return raiseException(
        400,
        "You are not allowed to send message to youself"
      );
    }

    /**
     * Check user with id toUserId exists
     */
    const User = getUser();
    const user = await User.findOne({
      where: {
        id: toUserId,
      },
    });
    if (!user) {
      return raiseException(400, "User with provided Id do not exists");
    }

    const Message = getMessage();
    const newMessage = new Message({
      content,
      toUserId,
      fromUserId: req.user.id,
    });
    await newMessage.save();

    const io = req.app.get("io");
    io.in(toUserId.toString()).emit("messages:create", newMessage);

    return {
      message: "Message sent successfully",
      payload: {
        message: newMessage,
      },
    };
  }
);
