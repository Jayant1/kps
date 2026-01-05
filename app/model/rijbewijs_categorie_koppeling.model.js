module.exports = (sequelize, Sequelize) => {
  const rijbewijs_categorie_koppeling = sequelize.define("rijbewijs_categorie_koppeling", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rijbewijs_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    rijbewijs_categorie_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    behaald_op: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    geldig_tot: {
      type: Sequelize.DATEONLY,
      allowNull: true
    }
  });

  rijbewijs_categorie_koppeling.associate = function(models) {
    rijbewijs_categorie_koppeling.belongsTo(models.rijbewijzen, {
      foreignKey: 'rijbewijs_id',
      as: 'rijbewijs'
    });
    rijbewijs_categorie_koppeling.belongsTo(models.rijbewijs_categorieen, {
      foreignKey: 'rijbewijs_categorie_id',
      as: 'categorie'
    });
  };

  return rijbewijs_categorie_koppeling;
};
