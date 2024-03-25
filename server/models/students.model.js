module.exports = (sequelize, DataTypes) => {
  return sequelize.define("students", {
    reg_number: { type: DataTypes.STRING, allowNull: false },
  });
};
