module.exports = (sequelize, Sequelize) => {
  const rijbewijs_aanvragen = sequelize.define("rijbewijs_aanvragen", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    identificatienummer_aanvrager: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    rijbewijs_categorie_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    aanvraag_status_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    aanvraag_datum: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    besluit_datum: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    datum_medische_keuring: {
      type: Sequelize.DATE,
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

  rijbewijs_aanvragen.associate = function(models) {
    rijbewijs_aanvragen.belongsTo(models.rijbewijs_categorieen, {
      foreignKey: 'rijbewijs_categorie_id',
      as: 'categorie'
    });
    rijbewijs_aanvragen.belongsTo(models.aanvraag_statussen, {
      foreignKey: 'aanvraag_status_id',
      as: 'status'
    });
  };

  return rijbewijs_aanvragen;
};
