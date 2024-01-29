module.exports = (sequelize, DataTypes) => {
  const Elections = sequelize.define("elections", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    candidate_reg_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    voter_reg_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Elections;
};
