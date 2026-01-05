module.exports = (sequelize, Sequelize) => {
  const rijlessen = sequelize.define("rijlessen", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    identificatienummer_leerling: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    rijschool_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    instructeur_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    rijbewijs_categorie_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    les_datum: {
      type: Sequelize.DATE,
      allowNull: true
    },
    les_duur_minuten: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    opmerkingen: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    identificatienummer_gewijzigd_door: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    datum_gewijzigd: {
      type: Sequelize.DATE,
      allowNull: true
    }
  });

  rijlessen.associate = function(models) {
    rijlessen.belongsTo(models.rijscholen, {
      foreignKey: 'rijschool_id',
      as: 'rijschool'
    });
    rijlessen.belongsTo(models.instructeurs, {
      foreignKey: 'instructeur_id',
      as: 'instructeur'
    });
    rijlessen.belongsTo(models.rijbewijs_categorieen, {
      foreignKey: 'rijbewijs_categorie_id',
      as: 'categorie'
    });
  };

  return rijlessen;
};
