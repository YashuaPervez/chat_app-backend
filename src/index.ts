import "./loadEnv";

//
import { dbConnect } from "./config/db";
import server from "./server";

const PORT = process.env.PORT;
server.listen(PORT, async () => {
  const sequelize = await dbConnect();

  global.sequelize = sequelize;

  console.log(`Server up and running on port ${PORT}`);
});
