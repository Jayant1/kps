const db = require("../model/index.js");

const Studenten = db.studenten;
const Rijscholen = db.rijscholen;
const Rijinstructeurs = db.rijinstructeurs;
const Categorie = db.categorie;
const RijschoolInschrijvingen = db.rijschool_inschrijvingen;
const Examinatoren = db.examinatoren;
const Surveillanten = db.surveillanten;
const ExamenAanmeldingen = db.examen_aanmeldingen;
const TheorieExamenresultaten = db.theorie_examenresultaten;
const PraktijkExamenresultaten = db.praktijk_examenresultaten;
const PraktijkExamenresultatenDetails = db.praktijk_examenresultaten_details;

// 1. Inschrijven student bij rijschool
exports.inschrijven_student = async (req, res) => {
  try {
    const {
      student_identificatienummer, student_geboortedatum, student_email, student_telefoon, student_adres,
      instructeur_identificatienummer, rijschool_naam, categorie_code, inschrijfdatum, ingevoerd_door
    } = req.body;

    if (!student_identificatienummer || !rijschool_naam || !categorie_code || !ingevoerd_door) {
      return res.status(400).json({ success: false, message: "student_identificatienummer, rijschool_naam, categorie_code en ingevoerd_door zijn verplicht" });
    }

    let student = await Studenten.findOne({ where: { identificatienummer: student_identificatienummer } });
    if (!student) {
      if (!student_geboortedatum || !student_email) {
        return res.status(400).json({ success: false, message: `Student '${student_identificatienummer}' niet gevonden. Stuur ook student_geboortedatum en student_email mee om de student aan te maken` });
      }
      student = await Studenten.create({
        identificatienummer: student_identificatienummer,
        geboortedatum: student_geboortedatum,
        email: student_email,
        telefoon: student_telefoon || null,
        adres: student_adres || null,
        ingevoerd_door
      });
    }

    const rijschool = await Rijscholen.findOne({ where: { naam: rijschool_naam } });
    if (!rijschool) {
      return res.status(404).json({ success: false, message: `Rijschool met naam '${rijschool_naam}' niet gevonden` });
    }

    const categorie = await Categorie.findOne({ where: { code: categorie_code } });
    if (!categorie) {
      return res.status(404).json({ success: false, message: `Categorie met code '${categorie_code}' niet gevonden` });
    }

    let instructeur_id = null;
    if (instructeur_identificatienummer) {
      const instructeur = await Rijinstructeurs.findOne({ where: { identificatienummer: instructeur_identificatienummer } });
      if (!instructeur) {
        return res.status(404).json({ success: false, message: `Instructeur met identificatienummer '${instructeur_identificatienummer}' niet gevonden` });
      }
      if (instructeur.rijschool_id !== rijschool.id) {
        return res.status(400).json({ success: false, message: `Instructeur '${instructeur_identificatienummer}' is niet verbonden aan rijschool '${rijschool_naam}'` });
      }
      instructeur_id = instructeur.id;
    }

    const inschrijving = await RijschoolInschrijvingen.create({
      student_id: student.id,
      rijschool_id: rijschool.id,
      instructeur_id,
      categorie_id: categorie.id,
      inschrijfdatum: inschrijfdatum || new Date(),
      ingevoerd_door
    });
    return res.status(201).json({ success: true, data: inschrijving });
  } catch (error) {
    console.error("Error inschrijven student:", error);
    return res.status(500).json({ success: false, message: "Fout bij inschrijven van student", error: error.message });
  }
};

// 2. Wijzig advies theorie
exports.wijzig_advies_theorie = async (req, res) => {
  try {
    const { id } = req.params;
    const { advies_theorie, advies_theorie_datum, gewijzigd_door } = req.body;
    if (!advies_theorie || !gewijzigd_door) {
      return res.status(400).json({ success: false, message: "advies_theorie en gewijzigd_door zijn verplicht" });
    }
    const inschrijving = await RijschoolInschrijvingen.findByPk(id);
    if (!inschrijving) {
      return res.status(404).json({ success: false, message: "Inschrijving niet gevonden" });
    }
    await inschrijving.update({ advies_theorie, advies_theorie_datum, gewijzigd_door, datum_gewijzigd: new Date() });
    return res.status(200).json({ success: true, data: inschrijving });
  } catch (error) {
    console.error("Error wijzigen advies theorie:", error);
    return res.status(500).json({ success: false, message: "Fout bij wijzigen van advies theorie", error: error.message });
  }
};

// 3. Wijzig advies praktijk
exports.wijzig_advies_praktijk = async (req, res) => {
  try {
    const { id } = req.params;
    const { advies_praktijk, advies_praktijk_datum, gewijzigd_door } = req.body;
    if (!advies_praktijk || !gewijzigd_door) {
      return res.status(400).json({ success: false, message: "advies_praktijk en gewijzigd_door zijn verplicht" });
    }
    const inschrijving = await RijschoolInschrijvingen.findByPk(id);
    if (!inschrijving) {
      return res.status(404).json({ success: false, message: "Inschrijving niet gevonden" });
    }
    await inschrijving.update({ advies_praktijk, advies_praktijk_datum, gewijzigd_door, datum_gewijzigd: new Date() });
    return res.status(200).json({ success: true, data: inschrijving });
  } catch (error) {
    console.error("Error wijzigen advies praktijk:", error);
    return res.status(500).json({ success: false, message: "Fout bij wijzigen van advies praktijk", error: error.message });
  }
};

// 4. Aanmelden student voor theorie examen
exports.aanmelden_student_theorie_examen = async (req, res) => {
  try {
    const { inschrijving_id, gekozen_datum, locatie, ingevoerd_door } = req.body;
    if (!inschrijving_id || !gekozen_datum || !ingevoerd_door) {
      return res.status(400).json({ success: false, message: "inschrijving_id, gekozen_datum en ingevoerd_door zijn verplicht" });
    }
    const inschrijving = await RijschoolInschrijvingen.findByPk(inschrijving_id);
    if (!inschrijving) {
      return res.status(404).json({ success: false, message: "Inschrijving niet gevonden" });
    }
    if (inschrijving.advies_theorie !== 'positief') {
      return res.status(400).json({ success: false, message: "Student heeft geen positief advies voor theorie examen" });
    }
    const aanmelding = await ExamenAanmeldingen.create({
      inschrijving_id,
      examen_type: 'theorie',
      gekozen_datum,
      locatie,
      ingevoerd_door
    });
    return res.status(201).json({ success: true, data: aanmelding });
  } catch (error) {
    console.error("Error aanmelden theorie examen:", error);
    return res.status(500).json({ success: false, message: "Fout bij aanmelden voor theorie examen", error: error.message });
  }
};

// 5. Aanmelden student voor praktijk examen
exports.aanmelden_student_praktijk_examen = async (req, res) => {
  try {
    const { inschrijving_id, gekozen_datum, locatie, ingevoerd_door } = req.body;
    if (!inschrijving_id || !gekozen_datum || !ingevoerd_door) {
      return res.status(400).json({ success: false, message: "inschrijving_id, gekozen_datum en ingevoerd_door zijn verplicht" });
    }
    const inschrijving = await RijschoolInschrijvingen.findByPk(inschrijving_id);
    if (!inschrijving) {
      return res.status(404).json({ success: false, message: "Inschrijving niet gevonden" });
    }
    if (inschrijving.advies_praktijk !== 'positief') {
      return res.status(400).json({ success: false, message: "Student heeft geen positief advies voor praktijk examen" });
    }
    const aanmelding = await ExamenAanmeldingen.create({
      inschrijving_id,
      examen_type: 'praktijk',
      gekozen_datum,
      locatie,
      ingevoerd_door
    });
    return res.status(201).json({ success: true, data: aanmelding });
  } catch (error) {
    console.error("Error aanmelden praktijk examen:", error);
    return res.status(500).json({ success: false, message: "Fout bij aanmelden voor praktijk examen", error: error.message });
  }
};

// 6. Bewaar resultaten theorie examen
exports.bewaar_resultaten_theorie_examen = async (req, res) => {
  try {
    const { aanmelding_id, surveillant_id, afgenomen_op, score, max_score, geslaagd, opmerkingen, ingevoerd_door } = req.body;
    if (!aanmelding_id || !afgenomen_op || geslaagd === undefined || !ingevoerd_door) {
      return res.status(400).json({ success: false, message: "aanmelding_id, afgenomen_op, geslaagd en ingevoerd_door zijn verplicht" });
    }
    const aanmelding = await ExamenAanmeldingen.findByPk(aanmelding_id);
    if (!aanmelding) {
      return res.status(404).json({ success: false, message: "Examen aanmelding niet gevonden" });
    }
    if (aanmelding.examen_type !== 'theorie') {
      return res.status(400).json({ success: false, message: "Aanmelding is niet van het type theorie" });
    }
    const resultaat = await TheorieExamenresultaten.create({
      aanmelding_id,
      surveillant_id,
      afgenomen_op,
      score,
      max_score,
      geslaagd,
      opmerkingen,
      ingevoerd_door
    });
    await aanmelding.update({ status: 'afgenomen', gewijzigd_door: ingevoerd_door, datum_gewijzigd: new Date() });
    return res.status(201).json({ success: true, data: resultaat });
  } catch (error) {
    console.error("Error bewaren theorie resultaten:", error);
    return res.status(500).json({ success: false, message: "Fout bij bewaren van theorie examenresultaten", error: error.message });
  }
};

// 7. Bewaar resultaten praktijk examen
exports.bewaar_resultaten_praktijk_examen = async (req, res) => {
  try {
    const { aanmelding_id, examinator_id, afgenomen_op, route_omschrijving, rijtijd_minuten, geslaagd, opmerkingen, ingevoerd_door, details } = req.body;
    if (!aanmelding_id || !examinator_id || !afgenomen_op || geslaagd === undefined || !ingevoerd_door) {
      return res.status(400).json({ success: false, message: "aanmelding_id, examinator_id, afgenomen_op, geslaagd en ingevoerd_door zijn verplicht" });
    }
    const aanmelding = await ExamenAanmeldingen.findByPk(aanmelding_id);
    if (!aanmelding) {
      return res.status(404).json({ success: false, message: "Examen aanmelding niet gevonden" });
    }
    if (aanmelding.examen_type !== 'praktijk') {
      return res.status(400).json({ success: false, message: "Aanmelding is niet van het type praktijk" });
    }
    const resultaat = await PraktijkExamenresultaten.create({
      aanmelding_id,
      examinator_id,
      afgenomen_op,
      route_omschrijving,
      rijtijd_minuten,
      geslaagd,
      opmerkingen,
      ingevoerd_door
    });
    if (details && Array.isArray(details) && details.length > 0) {
      const detailRecords = details.map(d => ({ ...d, praktijk_resultaat_id: resultaat.id, ingevoerd_door }));
      await PraktijkExamenresultatenDetails.bulkCreate(detailRecords);
    }
    await aanmelding.update({ status: 'afgenomen', gewijzigd_door: ingevoerd_door, datum_gewijzigd: new Date() });
    const volledigResultaat = await PraktijkExamenresultaten.findByPk(resultaat.id, {
      include: [{ model: PraktijkExamenresultatenDetails, as: 'details' }]
    });
    return res.status(201).json({ success: true, data: volledigResultaat });
  } catch (error) {
    console.error("Error bewaren praktijk resultaten:", error);
    return res.status(500).json({ success: false, message: "Fout bij bewaren van praktijk examenresultaten", error: error.message });
  }
};
