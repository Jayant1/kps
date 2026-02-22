module.exports = (sequelize, Sequelize) => {
  const examen_aanmeldingen = sequelize.define("examen_aanmeldingen", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    inschrijving_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    examen_type: {
      type: Sequelize.ENUM('theorie', 'praktijk'),
      allowNull: false,
      values: ['theorie', 'praktijk']
    },
    gekozen_datum: {
      type: Sequelize.DATE,
      allowNull: false
    },
    locatie: {
      type: Sequelize.STRING(150),
      allowNull: true
    },
    aangemeld_op: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    status: {
      type: Sequelize.ENUM('gepland', 'afgenomen', 'geannuleerd'),
      allowNull: false,
      defaultValue: 'gepland',
      values: ['gepland', 'afgenomen', 'geannuleerd']
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

  examen_aanmeldingen.associate = function(models) {
    examen_aanmeldingen.belongsTo(models.rijschool_inschrijvingen, {
      foreignKey: 'inschrijving_id',
      as: 'inschrijving'
    });
    examen_aanmeldingen.hasOne(models.theorie_examenresultaten, {
      foreignKey: 'aanmelding_id',
      as: 'theorie_resultaat'
    });
    examen_aanmeldingen.hasOne(models.praktijk_examenresultaten, {
      foreignKey: 'aanmelding_id',
      as: 'praktijk_resultaat'
    });
  };

  return examen_aanmeldingen;
};
