module.exports = (sequelize, Sequelize) => {
  const praktijk_examenresultaten = sequelize.define("praktijk_examenresultaten", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    aanmelding_id: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false
    },
    examinator_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    afgenomen_op: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    route_omschrijving: {
      type: Sequelize.STRING(200),
      allowNull: true
    },
    rijtijd_minuten: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    geslaagd: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    opmerkingen: {
      type: Sequelize.TEXT,
      allowNull: true
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

  praktijk_examenresultaten.associate = function(models) {
    praktijk_examenresultaten.belongsTo(models.examen_aanmeldingen, {
      foreignKey: 'aanmelding_id',
      as: 'aanmelding'
    });
    praktijk_examenresultaten.belongsTo(models.examinatoren, {
      foreignKey: 'examinator_id',
      as: 'examinator'
    });
    praktijk_examenresultaten.hasMany(models.praktijk_examenresultaten_details, {
      foreignKey: 'praktijk_resultaat_id',
      as: 'details'
    });
  };

  return praktijk_examenresultaten;
};
