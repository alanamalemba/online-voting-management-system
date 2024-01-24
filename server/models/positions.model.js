module.exports = (sequelize, DataTypes) => {
  const Positions = sequelize.define("positions", {
    name: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    election_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Positions;
};
