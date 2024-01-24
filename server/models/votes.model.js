module.exports = (sequelize, DataTypes) => {
  const Votes = sequelize.define("votes", {
    election_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    candidate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Votes;
};
