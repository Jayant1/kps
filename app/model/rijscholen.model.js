module.exports = (sequelize, Sequelize) => {
  const rijscholen = sequelize.define("rijscholen", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    naam: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    adres: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    distrikt: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    wijk: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    kvk_nummer: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    vergunning_nummer: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    vergunning_geldig_tot: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    telefoon: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    email: {
      type: Sequelize.STRING(100),
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

  rijscholen.associate = function(models) {
    rijscholen.hasMany(models.instructeurs, {
      foreignKey: 'rijschool_id',
      as: 'instructeurs'
    });
    rijscholen.hasMany(models.rijlessen, {
      foreignKey: 'rijschool_id',
      as: 'rijlessen'
    });
  };

  return rijscholen;
};
