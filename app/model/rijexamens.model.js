module.exports = (sequelize, Sequelize) => {
  const rijexamens = sequelize.define("rijexamens", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    identificatienummer_kandidaat: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    rijbewijs_categorie_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    examen_type_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    examen_resultaat_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    examen_datum: {
      type: Sequelize.DATE,
      allowNull: true
    },
    locatie: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    instructeur_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    score: {
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

  rijexamens.associate = function(models) {
    rijexamens.belongsTo(models.rijbewijs_categorieen, {
      foreignKey: 'rijbewijs_categorie_id',
      as: 'categorie'
    });
    rijexamens.belongsTo(models.examen_types, {
      foreignKey: 'examen_type_id',
      as: 'examen_type'
    });
    rijexamens.belongsTo(models.examen_resultaten, {
      foreignKey: 'examen_resultaat_id',
      as: 'resultaat'
    });
    rijexamens.belongsTo(models.instructeurs, {
      foreignKey: 'instructeur_id',
      as: 'instructeur'
    });
  };

  return rijexamens;
};
