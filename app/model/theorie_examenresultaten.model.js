module.exports = (sequelize, Sequelize) => {
  const theorie_examenresultaten = sequelize.define("theorie_examenresultaten", {
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
    surveillant_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    afgenomen_op: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    max_score: {
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

  theorie_examenresultaten.associate = function(models) {
    theorie_examenresultaten.belongsTo(models.examen_aanmeldingen, {
      foreignKey: 'aanmelding_id',
      as: 'aanmelding'
    });
    theorie_examenresultaten.belongsTo(models.surveillanten, {
      foreignKey: 'surveillant_id',
      as: 'surveillant'
    });
  };

  return theorie_examenresultaten;
};
