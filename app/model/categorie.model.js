module.exports = (sequelize, Sequelize) => {
  const categorie = sequelize.define("categorie", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: Sequelize.STRING(5),
      unique: true,
      allowNull: false
    },
    omschrijving: {
      type: Sequelize.STRING(100),
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

  categorie.associate = function(models) {
    categorie.hasMany(models.rijschool_inschrijvingen, {
      foreignKey: 'categorie_id',
      as: 'inschrijvingen'
    });
  };

  return categorie;
};
