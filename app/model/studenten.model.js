module.exports = (sequelize, Sequelize) => {
  const studenten = sequelize.define("studenten", {
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
    geboortedatum: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(100),
      unique: true,
      allowNull: false
    },
    telefoon: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    adres: {
      type: Sequelize.STRING(200),
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

  studenten.associate = function(models) {
    studenten.hasMany(models.rijschool_inschrijvingen, {
      foreignKey: 'student_id',
      as: 'inschrijvingen'
    });
  };

  return studenten;
};
