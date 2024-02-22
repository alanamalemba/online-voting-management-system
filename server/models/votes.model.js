module.exports = (sequelize, DataTypes) => {
  return sequelize.define("votes", {
    election_id: { type: DataTypes.INTEGER, allowNull: false },
    candidate_id: { type: DataTypes.INTEGER, allowNull: false },
  });
};
