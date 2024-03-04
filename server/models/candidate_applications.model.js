module.exports = (sequelize, DataTypes) => {
  return sequelize.define("candidate_applications", {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    passport_photo_url: { type: DataTypes.STRING, allowNull: false },
    id_photo_url: { type: DataTypes.STRING, allowNull: false },
    student_id: { type: DataTypes.STRING, allowNull: false },
    election_id: { type: DataTypes.INTEGER, allowNull: false },
    position_id: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
  });
};
