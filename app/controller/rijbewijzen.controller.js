const db = require("../model/index.js");

const Rijbewijzen = db.rijbewijzen;
const RijbewijsCategorieen = db.rijbewijs_categorieen;
const RijbewijsStatussen = db.rijbewijs_statussen;
const RijbewijsCategorie_koppeling = db.rijbewijs_categorie_koppeling;
const RijbewijsAanvragen = db.rijbewijs_aanvragen;
const AanvraagStatussen = db.aanvraag_statussen;
const Rijexamens = db.rijexamens;
const ExamenTypes = db.examen_types;
const ExamenResultaten = db.examen_resultaten;
const Rijlessen = db.rijlessen;
const Rijscholen = db.rijscholen;
const Instructeurs = db.instructeurs;
const Overtredingen = db.overtredingen;
const OvertredingTypes = db.overtreding_types;
const RijbewijsMutatiesLog = db.rijbewijs_mutaties_log;

exports.ophaalRijbewijsGegevens = async (req, res) => {
  try {
    const { identificatienummer } = req.params;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const rijbewijs = await Rijbewijzen.findOne({
      where: { identificatienummer_houder: identificatienummer },
      include: [
        {
          model: RijbewijsStatussen,
          as: 'status',
          attributes: ['id', 'naam']
        },
        {
          model: RijbewijsCategorie_koppeling,
          as: 'categorieen',
          include: [
            {
              model: RijbewijsCategorieen,
              as: 'categorie',
              attributes: ['id', 'code', 'omschrijving', 'min_leeftijd']
            }
          ]
        },
        {
          model: Overtredingen,
          as: 'overtredingen',
          include: [
            {
              model: OvertredingTypes,
              as: 'overtreding_type',
              attributes: ['id', 'code', 'omschrijving']
            }
          ]
        }
      ]
    });

    if (!rijbewijs) {
      return res.status(404).json({
        success: false,
        message: "Rijbewijs niet gevonden voor dit identificatienummer"
      });
    }

    return res.status(200).json({
      success: true,
      data: rijbewijs
    });

  } catch (error) {
    console.error("Error ophalen rijbewijs gegevens:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van rijbewijs gegevens",
      error: error.message
    });
  }
};

exports.ophaalRijbewijsAanvragen = async (req, res) => {
  try {
    const { identificatienummer } = req.params;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const aanvragen = await RijbewijsAanvragen.findAll({
      where: { identificatienummer_aanvrager: identificatienummer },
      include: [
        {
          model: RijbewijsCategorieen,
          as: 'categorie',
          attributes: ['id', 'code', 'omschrijving']
        },
        {
          model: AanvraagStatussen,
          as: 'status',
          attributes: ['id', 'naam']
        }
      ],
      order: [['aanvraag_datum', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: aanvragen
    });

  } catch (error) {
    console.error("Error ophalen aanvragen:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van rijbewijs aanvragen",
      error: error.message
    });
  }
};

exports.ophaalRijexamens = async (req, res) => {
  try {
    const { identificatienummer } = req.params;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const examens = await Rijexamens.findAll({
      where: { identificatienummer_kandidaat: identificatienummer },
      include: [
        {
          model: RijbewijsCategorieen,
          as: 'categorie',
          attributes: ['id', 'code', 'omschrijving']
        },
        {
          model: ExamenTypes,
          as: 'examen_type',
          attributes: ['id', 'naam']
        },
        {
          model: ExamenResultaten,
          as: 'resultaat',
          attributes: ['id', 'naam']
        },
        {
          model: Instructeurs,
          as: 'instructeur',
          attributes: ['id', 'identificatienummer_instructeur', 'certificaat_nummer'],
          include: [
            {
              model: Rijscholen,
              as: 'rijschool',
              attributes: ['id', 'naam']
            }
          ]
        }
      ],
      order: [['examen_datum', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: examens
    });

  } catch (error) {
    console.error("Error ophalen examens:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van rijexamens",
      error: error.message
    });
  }
};

exports.ophaalRijlessen = async (req, res) => {
  try {
    const { identificatienummer } = req.params;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const lessen = await Rijlessen.findAll({
      where: { identificatienummer_leerling: identificatienummer },
      include: [
        {
          model: Rijscholen,
          as: 'rijschool',
          attributes: ['id', 'naam', 'adres', 'telefoon']
        },
        {
          model: Instructeurs,
          as: 'instructeur',
          attributes: ['id', 'identificatienummer_instructeur', 'certificaat_nummer']
        },
        {
          model: RijbewijsCategorieen,
          as: 'categorie',
          attributes: ['id', 'code', 'omschrijving']
        }
      ],
      order: [['les_datum', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: lessen
    });

  } catch (error) {
    console.error("Error ophalen rijlessen:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van rijlessen",
      error: error.message
    });
  }
};

exports.ophaalOvertredingen = async (req, res) => {
  try {
    const { identificatienummer } = req.params;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const overtredingen = await Overtredingen.findAll({
      where: { identificatienummer_overtreder: identificatienummer },
      include: [
        {
          model: Rijbewijzen,
          as: 'rijbewijs',
          attributes: ['id', 'rijbewijs_nummer', 'uitgiftedatum', 'vervaldatum']
        },
        {
          model: OvertredingTypes,
          as: 'overtreding_type',
          attributes: ['id', 'code', 'omschrijving']
        }
      ],
      order: [['overtreding_datum', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: overtredingen
    });

  } catch (error) {
    console.error("Error ophalen overtredingen:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van overtredingen",
      error: error.message
    });
  }
};

exports.ophaalRijscholen = async (req, res) => {
  try {
    const { actief } = req.query;

    const whereClause = {};
    if (actief !== undefined) {
      whereClause.actief = actief === 'true' ? 1 : 0;
    }

    const rijscholen = await Rijscholen.findAll({
      where: whereClause,
      include: [
        {
          model: Instructeurs,
          as: 'instructeurs',
          where: { actief: 1 },
          required: false,
          attributes: ['id', 'identificatienummer_instructeur', 'certificaat_nummer', 'bevoegde_categorieen']
        }
      ],
      order: [['naam', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: rijscholen
    });

  } catch (error) {
    console.error("Error ophalen rijscholen:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van rijscholen",
      error: error.message
    });
  }
};

exports.ophaalRijschoolById = async (req, res) => {
  try {
    const { id } = req.params;

    const rijschool = await Rijscholen.findByPk(id, {
      include: [
        {
          model: Instructeurs,
          as: 'instructeurs',
          attributes: ['id', 'identificatienummer_instructeur', 'certificaat_nummer', 'certificaat_geldig_tot', 'bevoegde_categorieen', 'actief']
        }
      ]
    });

    if (!rijschool) {
      return res.status(404).json({
        success: false,
        message: "Rijschool niet gevonden"
      });
    }

    return res.status(200).json({
      success: true,
      data: rijschool
    });

  } catch (error) {
    console.error("Error ophalen rijschool:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van rijschool",
      error: error.message
    });
  }
};

exports.ophaalCategorieen = async (req, res) => {
  try {
    const categorieen = await RijbewijsCategorieen.findAll({
      order: [['code', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: categorieen
    });

  } catch (error) {
    console.error("Error ophalen categorieen:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van rijbewijs categorieen",
      error: error.message
    });
  }
};

exports.ophaalStatussen = async (req, res) => {
  try {
    const statussen = await RijbewijsStatussen.findAll({
      order: [['naam', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: statussen
    });

  } catch (error) {
    console.error("Error ophalen statussen:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van rijbewijs statussen",
      error: error.message
    });
  }
};

exports.ophaalAanvraagStatussen = async (req, res) => {
  try {
    const statussen = await AanvraagStatussen.findAll({
      order: [['naam', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: statussen
    });

  } catch (error) {
    console.error("Error ophalen aanvraag statussen:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van aanvraag statussen",
      error: error.message
    });
  }
};

exports.ophaalExamenTypes = async (req, res) => {
  try {
    const types = await ExamenTypes.findAll({
      order: [['naam', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: types
    });

  } catch (error) {
    console.error("Error ophalen examen types:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van examen types",
      error: error.message
    });
  }
};

exports.ophaalExamenResultaten = async (req, res) => {
  try {
    const resultaten = await ExamenResultaten.findAll({
      order: [['naam', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: resultaten
    });

  } catch (error) {
    console.error("Error ophalen examen resultaten:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van examen resultaten",
      error: error.message
    });
  }
};

exports.ophaalOvertredingTypes = async (req, res) => {
  try {
    const types = await OvertredingTypes.findAll({
      order: [['code', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: types
    });

  } catch (error) {
    console.error("Error ophalen overtreding types:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van overtreding types",
      error: error.message
    });
  }
};

exports.ophaalCompleetDossier = async (req, res) => {
  try {
    const { identificatienummer } = req.params;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const rijbewijs = await Rijbewijzen.findOne({
      where: { identificatienummer_houder: identificatienummer },
      include: [
        {
          model: RijbewijsStatussen,
          as: 'status',
          attributes: ['id', 'naam']
        },
        {
          model: RijbewijsCategorie_koppeling,
          as: 'categorieen',
          include: [
            {
              model: RijbewijsCategorieen,
              as: 'categorie',
              attributes: ['id', 'code', 'omschrijving', 'min_leeftijd']
            }
          ]
        },
        {
          model: Overtredingen,
          as: 'overtredingen',
          include: [
            {
              model: OvertredingTypes,
              as: 'overtreding_type',
              attributes: ['id', 'code', 'omschrijving']
            }
          ]
        }
      ]
    });

    const aanvragen = await RijbewijsAanvragen.findAll({
      where: { identificatienummer_aanvrager: identificatienummer },
      include: [
        {
          model: RijbewijsCategorieen,
          as: 'categorie',
          attributes: ['id', 'code', 'omschrijving']
        },
        {
          model: AanvraagStatussen,
          as: 'status',
          attributes: ['id', 'naam']
        }
      ],
      order: [['aanvraag_datum', 'DESC']]
    });

    const examens = await Rijexamens.findAll({
      where: { identificatienummer_kandidaat: identificatienummer },
      include: [
        {
          model: RijbewijsCategorieen,
          as: 'categorie',
          attributes: ['id', 'code', 'omschrijving']
        },
        {
          model: ExamenTypes,
          as: 'examen_type',
          attributes: ['id', 'naam']
        },
        {
          model: ExamenResultaten,
          as: 'resultaat',
          attributes: ['id', 'naam']
        }
      ],
      order: [['examen_datum', 'DESC']]
    });

    const lessen = await Rijlessen.findAll({
      where: { identificatienummer_leerling: identificatienummer },
      include: [
        {
          model: Rijscholen,
          as: 'rijschool',
          attributes: ['id', 'naam']
        },
        {
          model: RijbewijsCategorieen,
          as: 'categorie',
          attributes: ['id', 'code', 'omschrijving']
        }
      ],
      order: [['les_datum', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: {
        identificatienummer: identificatienummer,
        rijbewijs: rijbewijs,
        aanvragen: aanvragen,
        examens: examens,
        rijlessen: lessen
      }
    });

  } catch (error) {
    console.error("Error ophalen compleet dossier:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van compleet rijbewijs dossier",
      error: error.message
    });
  }
};
