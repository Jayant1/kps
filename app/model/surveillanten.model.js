module.exports = (sequelize, Sequelize) => {
  const surveillanten = sequelize.define("surveillanten", {
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

  surveillanten.associate = function(models) {
    surveillanten.hasMany(models.theorie_examenresultaten, {
      foreignKey: 'surveillant_id',
      as: 'theorie_resultaten'
    });
  };

  return surveillanten;
};
