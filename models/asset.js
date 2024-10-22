module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define("Asset", {
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    make: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    uniqueId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Available",
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
  });

  return Asset;
};
