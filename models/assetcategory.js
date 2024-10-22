module.exports = (sequelize, DataTypes) => {
  const AssetCategory = sequelize.define("AssetCategory", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return AssetCategory;
};
