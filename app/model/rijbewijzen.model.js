module.exports = (sequelize, Sequelize) => {
  const rijbewijzen = sequelize.define("rijbewijzen", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    identificatienummer_houder: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    rijbewijs_nummer: {
      type: Sequelize.STRING(50),
      unique: true,
      allowNull: false
    },
    uitgiftedatum: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    vervaldatum: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    rijbewijs_status_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    uitgegeven_door: {
      type: Sequelize.STRING(100),
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

  rijbewijzen.associate = function(models) {
    rijbewijzen.belongsTo(models.rijbewijs_statussen, {
      foreignKey: 'rijbewijs_status_id',
      as: 'status'
    });
    rijbewijzen.hasMany(models.rijbewijs_categorie_koppeling, {
      foreignKey: 'rijbewijs_id',
      as: 'categorieen'
    });
    rijbewijzen.hasMany(models.overtredingen, {
      foreignKey: 'rijbewijs_id',
      as: 'overtredingen'
    });
  };

  return rijbewijzen;
};
