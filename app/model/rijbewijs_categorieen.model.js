module.exports = (sequelize, Sequelize) => {
  const rijbewijs_categorieen = sequelize.define("rijbewijs_categorieen", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: Sequelize.STRING(5),
      unique: true,
      allowNull: false
    },
    omschrijving: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    min_leeftijd: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  });

  return rijbewijs_categorieen;
};
