module.exports = (sequelize, DataTypes) => {
  return sequelize.define("elections", {
    name: { type: DataTypes.STRING, allowNull: false },
    photo_url: { type: DataTypes.STRING, allowNull: false },
    start_date: { type: DataTypes.STRING, allowNull: false },
    end_date: { type: DataTypes.STRING, allowNull: false },
  });
};
