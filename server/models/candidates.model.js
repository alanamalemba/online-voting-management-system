module.exports = (sequelize, DataTypes) => {
  const Candidates = sequelize.define("candidates", {
    election_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Candidates;
};
