module.exports = (sequelize, DataTypes) => {
  const CandidateApplications = sequelize.define("candidate_applications", {
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
    position_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    manifesto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return CandidateApplications;
};
