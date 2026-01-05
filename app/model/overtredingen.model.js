module.exports = (sequelize, Sequelize) => {
  const overtredingen = sequelize.define("overtredingen", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    identificatienummer_overtreder: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    rijbewijs_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    overtreding_type_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    overtreding_datum: {
      type: Sequelize.DATE,
      allowNull: true
    },
    locatie: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    boete_bedrag: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    proces_verbaal_nummer: {
      type: Sequelize.STRING(50),
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

  overtredingen.associate = function(models) {
    overtredingen.belongsTo(models.rijbewijzen, {
      foreignKey: 'rijbewijs_id',
      as: 'rijbewijs'
    });
    overtredingen.belongsTo(models.overtreding_types, {
      foreignKey: 'overtreding_type_id',
      as: 'overtreding_type'
    });
  };

  return overtredingen;
};
