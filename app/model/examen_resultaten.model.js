module.exports = (sequelize, Sequelize) => {
  const examen_resultaten = sequelize.define("examen_resultaten", {
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

  return examen_resultaten;
};
