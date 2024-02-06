module.exports = (sequelize, DataTypes) => {
  const VoterApplications = sequelize.define("voter_applications", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_photo_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_photo_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    election_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return VoterApplications;
};
