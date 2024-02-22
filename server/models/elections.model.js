module.exports = (sequelize, DataTypes) => {
  return sequelize.define("elections", {
    name: { type: DataTypes.STRING, allowNull: false },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
  });
};
