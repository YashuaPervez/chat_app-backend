import bcrypt from "bcrypt";

// Models
import getUser from "../../models/User";

//
import { generateController } from "../../lib/generateController";
import signToken from "../../utils/signToken";

export const loginController = generateController(
  async (req, res, raiseException) => {
    const { email, password } = req.body;

    const User = getUser();
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return raiseException(401, "Invalid credentials");
    }

    const passwordHash = user.dataValues.password;

    const isCorrect = await bcrypt.compare(password, passwordHash);

    if (!isCorrect) {
      return raiseException(401, "Invalid credentials");
    }

    const token = signToken(user.dataValues.id);

    res.cookie("token", token, {
      httpOnly: true,
    });

    return {
      message: "Logged in successfully",
      payload: { user },
    };
  }
);
