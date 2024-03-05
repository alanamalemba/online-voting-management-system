module.exports = (sequelize, DataTypes) => {
  return sequelize.define("candidates", {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    election_id: { type: DataTypes.INTEGER, allowNull: false },
    passport_photo_url: { type: DataTypes.STRING, allowNull: false },
  });
};
