module.exports = (sequelize, Sequelize) => {
  const examinatoren = sequelize.define("examinatoren", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    identificatienummer: {
      type: Sequelize.STRING(30),
      unique: true,
      allowNull: false
    },
    badge_nr: {
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

  examinatoren.associate = function(models) {
    examinatoren.hasMany(models.praktijk_examenresultaten, {
      foreignKey: 'examinator_id',
      as: 'praktijk_resultaten'
    });
  };

  return examinatoren;
};
