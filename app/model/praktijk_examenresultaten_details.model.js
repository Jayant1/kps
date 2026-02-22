module.exports = (sequelize, Sequelize) => {
  const praktijk_examenresultaten_details = sequelize.define("praktijk_examenresultaten_details", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    praktijk_resultaat_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    volgorde: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    type_opdracht: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    categorie_opdracht: {
      type: Sequelize.ENUM(
        'verkeersdeelname',
        'voertuigbeheersing',
        'bijzondere_verrichtingen',
        'attitude'
      ),
      allowNull: true,
      values: ['verkeersdeelname', 'voertuigbeheersing', 'bijzondere_verrichtingen', 'attitude']
    },
    resultaat: {
      type: Sequelize.ENUM('goed', 'fout', 'gevaarlijk'),
      allowNull: false,
      values: ['goed', 'fout', 'gevaarlijk']
    },
    notitie: {
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

  praktijk_examenresultaten_details.associate = function(models) {
    praktijk_examenresultaten_details.belongsTo(models.praktijk_examenresultaten, {
      foreignKey: 'praktijk_resultaat_id',
      as: 'praktijk_resultaat'
    });
  };

  return praktijk_examenresultaten_details;
};
