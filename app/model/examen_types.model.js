module.exports = (sequelize, Sequelize) => {
  const examen_types = sequelize.define("examen_types", {
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

  return examen_types;
};
