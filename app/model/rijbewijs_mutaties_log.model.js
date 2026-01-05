module.exports = (sequelize, Sequelize) => {
  const rijbewijs_mutaties_log = sequelize.define("rijbewijs_mutaties_log", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tabel_naam: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    record_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    actie: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    oude_waarde: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    nieuwe_waarde: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    identificatienummer_gewijzigd_door: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    datum_gewijzigd: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  });

  return rijbewijs_mutaties_log;
};
