module.exports = (sequelize, Sequelize) => {
  const overtreding_types = sequelize.define("overtreding_types", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: Sequelize.STRING(20),
      unique: true,
      allowNull: false
    },
    omschrijving: {
      type: Sequelize.STRING(255),
      allowNull: true
    }
  });

  return overtreding_types;
};
