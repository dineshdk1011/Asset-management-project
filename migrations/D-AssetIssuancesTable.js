module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("asset_issuances", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Employees",
          key: "id",
        },
      },
      assetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Assets",
          key: "id",
        },
      },
      issueDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      returnDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      returnReason: {
        type: Sequelize.ENUM("upgrade", "repair", "resignation", "other"),
        allowNull: true,
      },
      scrapReason: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("issued", "returned", "scrapped", "lost"),
        allowNull: false,
        defaultValue: "issued",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("asset_issuances");
  },
};
