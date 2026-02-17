module.exports = (sequelize, Sequelize) => {
  const rijinstructeurs = sequelize.define("rijinstructeurs", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rijschool_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    identificatienummer: {
      type: Sequelize.STRING(30),
      unique: true,
      allowNull: false
    },
    licentie_nr: {
      type: Sequelize.STRING(30),
      unique: true,
      allowNull: false
    },
    ingevoerd_door: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    datum_ingevoerd: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    gewijzigd_door: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    datum_gewijzigd: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }, {
    timestamps: false
  });

  rijinstructeurs.associate = function(models) {
    rijinstructeurs.belongsTo(models.rijscholen, {
      foreignKey: 'rijschool_id',
      as: 'rijschool'
    });
    rijinstructeurs.hasMany(models.rijschool_inschrijvingen, {
      foreignKey: 'instructeur_id',
      as: 'inschrijvingen'
    });
  };

  return rijinstructeurs;
};
