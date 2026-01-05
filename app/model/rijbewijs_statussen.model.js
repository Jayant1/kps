module.exports = (sequelize, Sequelize) => {
  const rijbewijs_statussen = sequelize.define("rijbewijs_statussen", {
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

  return rijbewijs_statussen;
};
