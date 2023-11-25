// models/Message.ts

import { DataTypes, Model } from "sequelize";
import getUser from "./User";

export class Message extends Model {
  public id!: number;
  public content!: string;
  public fromUserId!: number;
  public toUserId!: number;
  public readAt!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default () => {
  const User = getUser();

  Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      fromUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      toUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      readAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Message",
    }
  );

  // Define associations between User and Message
  Message.belongsTo(User, { foreignKey: "fromUserId", as: "fromUser" });
  Message.belongsTo(User, { foreignKey: "toUserId", as: "toUser" });

  return Message;
};
