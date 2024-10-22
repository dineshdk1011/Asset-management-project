module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("Employee", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  return Employee;
};
