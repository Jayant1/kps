module.exports = (sequelize, Sequelize) => {
  const instructeurs = sequelize.define("instructeurs", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rijschool_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    identificatienummer_instructeur: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    certificaat_nummer: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    certificaat_geldig_tot: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    bevoegde_categorieen: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    actief: {
      type: Sequelize.TINYINT,
      defaultValue: 1
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

  instructeurs.associate = function(models) {
    instructeurs.belongsTo(models.rijscholen, {
      foreignKey: 'rijschool_id',
      as: 'rijschool'
    });
    instructeurs.hasMany(models.rijexamens, {
      foreignKey: 'instructeur_id',
      as: 'examens'
    });
    instructeurs.hasMany(models.rijlessen, {
      foreignKey: 'instructeur_id',
      as: 'lessen'
    });
  };

  return instructeurs;
};
