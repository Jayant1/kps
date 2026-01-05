module.exports = (sequelize, Sequelize) => {
  const aanvraag_statussen = sequelize.define("aanvraag_statussen", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    naam: {
      type: Sequelize.STRING(50),
      unique: true,
      allowNull: false
    }
  });

  return aanvraag_statussen;
};
