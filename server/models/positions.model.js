module.exports = (sequelize, DataTypes) => {
  return sequelize.define("positions", {
    name: { type: DataTypes.STRING, allowNull: false },
    election_id: { type: DataTypes.INTEGER, allowNull: false },
  });
};
