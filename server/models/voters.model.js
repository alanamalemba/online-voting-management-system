module.exports = (sequelize, DataTypes) => {
  const Voters = sequelize.define("voters", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    election_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    voted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  return Voters;
};
