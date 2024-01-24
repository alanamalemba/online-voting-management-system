module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "visitor",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Users;
};
