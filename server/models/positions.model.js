module.exports = (sequelize, DataTypes) => {
  const Positions = sequelize.define("positions", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    election_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Positions;
};
