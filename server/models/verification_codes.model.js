module.exports = (sequelize, DataTypes) => {
  return sequelize.define("verification_codes", {
    email: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING, allowNull: false },
  });
};
