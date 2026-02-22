module.exports = (sequelize, Sequelize) => {
  const rijschool_inschrijvingen = sequelize.define("rijschool_inschrijvingen", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    student_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    rijschool_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    instructeur_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    categorie_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    inschrijfdatum: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    advies_theorie: {
      type: Sequelize.ENUM('positief', 'negatief', 'in_behandeling'),
      allowNull: false,
      defaultValue: 'in_behandeling',
      values: ['positief', 'negatief', 'in_behandeling']
    },
    advies_theorie_datum: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    advies_praktijk: {
      type: Sequelize.ENUM('positief', 'negatief', 'in_behandeling'),
      allowNull: false,
      defaultValue: 'in_behandeling',
      values: ['positief', 'negatief', 'in_behandeling']
    },
    advies_praktijk_datum: {
      type: Sequelize.DATEONLY,
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

  rijschool_inschrijvingen.associate = function(models) {
    rijschool_inschrijvingen.belongsTo(models.studenten, {
      foreignKey: 'student_id',
      as: 'student'
    });
    rijschool_inschrijvingen.belongsTo(models.rijscholen, {
      foreignKey: 'rijschool_id',
      as: 'rijschool'
    });
    rijschool_inschrijvingen.belongsTo(models.rijinstructeurs, {
      foreignKey: 'instructeur_id',
      as: 'instructeur'
    });
    rijschool_inschrijvingen.belongsTo(models.categorie, {
      foreignKey: 'categorie_id',
      as: 'categorie'
    });
    rijschool_inschrijvingen.hasMany(models.examen_aanmeldingen, {
      foreignKey: 'inschrijving_id',
      as: 'examen_aanmeldingen'
    });
  };

  return rijschool_inschrijvingen;
};
