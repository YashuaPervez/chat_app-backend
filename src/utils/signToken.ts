import jwt from "jsonwebtoken";

const { JWT_SECRET = "" } = process.env;

const signToken = (id: number) => {
  const token = jwt.sign({ id }, JWT_SECRET);

  return token;
};

export default signToken;
