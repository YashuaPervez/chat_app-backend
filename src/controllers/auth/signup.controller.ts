import bcrypt from "bcrypt";

// Models
import getUser from "../../models/User";

//
import { generateController } from "../../lib/generateController";
import signToken from "../../utils/signToken";

export const signupController = generateController(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 16);

  const User = getUser();
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  const token = signToken(newUser.dataValues.id);

  res.cookie("token", token, {
    httpOnly: true,
  });

  return {
    message: "Signed up successfully",
    payload: { user: newUser },
  };
});
