import { Sequelize } from "sequelize";

declare global {
  namespace globalThis {
    var sequelize: Sequelize;
  }
}
