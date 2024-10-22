module.exports = (sequelize, DataTypes) => {
  const AssetIssuance = sequelize.define(
    "AssetIssuance",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Employees",
          key: "id",
        },
      },
      assetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Assets",
          key: "id",
        },
      },
      issueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      returnDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      returnReason: {
        type: DataTypes.ENUM("upgrade", "repair", "resignation", "other"),
        allowNull: true,
      },
      scrapReason: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("issued", "returned", "scrapped", "lost"),
        allowNull: false,
        defaultValue: "issued",
      },
    },
    {
      tableName: "asset_issuances",
      timestamps: true,
    }
  );

  AssetIssuance.associate = (models) => {
    AssetIssuance.belongsTo(models.Employee, { foreignKey: "employeeId" });
    AssetIssuance.belongsTo(models.Asset, { foreignKey: "assetId" });
  };

  return AssetIssuance;
};
