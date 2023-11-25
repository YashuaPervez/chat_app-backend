const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable("Messages", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    });

    // Add foreign key constraints
    await queryInterface.addConstraint("Messages", {
      type: "foreign key",
      fields: ["fromUserId"],
      name: "fk_messages_fromUserId",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("Messages", {
      type: "foreign key",
      fields: ["toUserId"],
      name: "fk_messages_toUserId",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface) => {
    // Remove foreign key constraints first
    await queryInterface.removeConstraint("Messages", "fk_messages_fromUserId");
    await queryInterface.removeConstraint("Messages", "fk_messages_toUserId");

    await queryInterface.dropTable("Messages");
  },
};
