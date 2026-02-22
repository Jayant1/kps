const controller = require("../controller/rijbewijzen.controller.js");

/**
 * @swagger
 * tags:
 *   name: Rijbewijzen
 *   description: Beheer van rijschoolinschrijvingen, examenaanmeldingen en examenresultaten
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Inschrijving:
 *       type: object
 *       required:
 *         - student_identificatienummer
 *         - student_geboortedatum
 *         - student_email
 *         - rijschool_naam
 *         - categorie_code
 *         - ingevoerd_door
 *       properties:
 *         student_identificatienummer:
 *           type: string
 *           description: Identificatienummer van de student
 *           example: IC010001
 *         student_geboortedatum:
 *           type: string
 *           format: date
 *           description: Geboortedatum van de student (verplicht als student nog niet bestaat)
 *           example: "1995-03-12"
 *         student_email:
 *           type: string
 *           format: email
 *           description: E-mailadres van de student (verplicht als student nog niet bestaat)
 *           example: aisha.ramdien@email.sr
 *         student_telefoon:
 *           type: string
 *           description: Telefoonnummer van de student (optioneel)
 *           example: "597-611001"
 *         student_adres:
 *           type: string
 *           description: Adres van de student (optioneel)
 *           example: Hofstraat 5, Paramaribo
 *         rijschool_naam:
 *           type: string
 *           description: Naam van de rijschool
 *           example: Rijschool De Palmboom
 *         instructeur_identificatienummer:
 *           type: string
 *           description: Identificatienummer van de instructeur (optioneel)
 *           example: IC001985
 *         categorie_code:
 *           type: string
 *           description: Code van de rijbewijscategorie (bijv. B, A, C)
 *           example: B
 *         inschrijfdatum:
 *           type: string
 *           format: date
 *           description: Datum van inschrijving (standaard vandaag)
 *         ingevoerd_door:
 *           type: string
 *           description: Gebruikersnaam van de invoerder
 *     AdviesTheorie:
 *       type: object
 *       required:
 *         - advies_theorie
 *         - gewijzigd_door
 *       properties:
 *         advies_theorie:
 *           type: string
 *           enum: [positief, negatief, in_behandeling]
 *           description: Advies voor het theorie examen
 *         advies_theorie_datum:
 *           type: string
 *           format: date
 *           description: Datum van het advies
 *         gewijzigd_door:
 *           type: string
 *           description: Gebruikersnaam van de wijziger
 *     AdviesPraktijk:
 *       type: object
 *       required:
 *         - advies_praktijk
 *         - gewijzigd_door
 *       properties:
 *         advies_praktijk:
 *           type: string
 *           enum: [positief, negatief, in_behandeling]
 *           description: Advies voor het praktijk examen
 *         advies_praktijk_datum:
 *           type: string
 *           format: date
 *           description: Datum van het advies
 *         gewijzigd_door:
 *           type: string
 *           description: Gebruikersnaam van de wijziger
 *     ExamenAanmelding:
 *       type: object
 *       required:
 *         - inschrijving_id
 *         - gekozen_datum
 *         - ingevoerd_door
 *       properties:
 *         inschrijving_id:
 *           type: integer
 *           description: ID van de rijschoolinschrijving
 *         gekozen_datum:
 *           type: string
 *           format: date-time
 *           description: Gekozen datum en tijd voor het examen
 *         locatie:
 *           type: string
 *           description: Locatie van het examen (optioneel)
 *         ingevoerd_door:
 *           type: string
 *           description: Gebruikersnaam van de invoerder
 *     TheorieResultaat:
 *       type: object
 *       required:
 *         - aanmelding_id
 *         - afgenomen_op
 *         - geslaagd
 *         - ingevoerd_door
 *       properties:
 *         aanmelding_id:
 *           type: integer
 *           description: ID van de examen aanmelding
 *         surveillant_id:
 *           type: integer
 *           description: ID van de surveillant (optioneel)
 *         afgenomen_op:
 *           type: string
 *           format: date
 *           description: Datum waarop het examen is afgenomen
 *         score:
 *           type: integer
 *           description: Behaalde score
 *         max_score:
 *           type: integer
 *           description: Maximale score
 *         geslaagd:
 *           type: boolean
 *           description: Of de student geslaagd is
 *         opmerkingen:
 *           type: string
 *           description: Opmerkingen bij het resultaat
 *         ingevoerd_door:
 *           type: string
 *           description: Gebruikersnaam van de invoerder
 *     PraktijkDetail:
 *       type: object
 *       properties:
 *         volgorde:
 *           type: integer
 *           description: Volgorde van de opdracht
 *         type_opdracht:
 *           type: string
 *           description: Type van de opdracht
 *         categorie_opdracht:
 *           type: string
 *           description: Categorie van de opdracht
 *         resultaat:
 *           type: string
 *           description: Resultaat van de opdracht
 *         notitie:
 *           type: string
 *           description: Notitie bij de opdracht
 *     PraktijkResultaat:
 *       type: object
 *       required:
 *         - aanmelding_id
 *         - examinator_id
 *         - afgenomen_op
 *         - geslaagd
 *         - ingevoerd_door
 *       properties:
 *         aanmelding_id:
 *           type: integer
 *           description: ID van de examen aanmelding
 *         examinator_id:
 *           type: integer
 *           description: ID van de examinator
 *         afgenomen_op:
 *           type: string
 *           format: date
 *           description: Datum waarop het examen is afgenomen
 *         route_omschrijving:
 *           type: string
 *           description: Omschrijving van de gereden route
 *         rijtijd_minuten:
 *           type: integer
 *           description: Rijtijd in minuten
 *         geslaagd:
 *           type: boolean
 *           description: Of de student geslaagd is
 *         opmerkingen:
 *           type: string
 *           description: Opmerkingen bij het resultaat
 *         ingevoerd_door:
 *           type: string
 *           description: Gebruikersnaam van de invoerder
 *         details:
 *           type: array
 *           description: Lijst van beoordelingsdetails (optioneel)
 *           items:
 *             $ref: '#/components/schemas/PraktijkDetail'
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *         error:
 *           type: string
 */

module.exports = (app) => {
  /**
   * @swagger
   * /api/rijbewijzen/inschrijven_student:
   *   post:
 *     summary: Schrijf een student in bij een rijschool
 *     description: |
 *       Schrijft een student in bij een rijschool voor een bepaalde rijbewijscategorie.
 *       Als de student nog niet bestaat in het systeem, wordt deze automatisch aangemaakt.
 *       In dat geval zijn `student_geboortedatum` en `student_email` verplicht.
 *       De instructeur is optioneel, maar moet wel verbonden zijn aan de opgegeven rijschool.
 *     tags: [Rijbewijzen]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inschrijving'
 *           examples:
 *             bestaande_student:
 *               summary: Inschrijving van bestaande student
 *               value:
 *                 student_identificatienummer: "IC010001"
 *                 student_geboortedatum: "1995-03-12"
 *                 student_email: "aisha.ramdien@email.sr"
 *                 rijschool_naam: "Rijschool De Palmboom"
 *                 instructeur_identificatienummer: "IC001985"
 *                 categorie_code: "B"
 *                 inschrijfdatum: "2026-02-22"
 *                 ingevoerd_door: "SYSTEEM"
 *             nieuwe_student:
 *               summary: Inschrijving met automatisch aanmaken van nieuwe student
 *               value:
 *                 student_identificatienummer: "IC010007"
 *                 student_geboortedatum: "2004-01-01"
 *                 student_email: "nieuw.student@email.sr"
 *                 student_telefoon: "597-611007"
 *                 student_adres: "Waterkant 10, Paramaribo"
 *                 rijschool_naam: "Rijschool De Palmboom"
 *                 instructeur_identificatienummer: "IC001985"
 *                 categorie_code: "B"
 *                 inschrijfdatum: "2026-02-22"
 *                 ingevoerd_door: "SYSTEEM"
 *     responses:
 *       201:
 *         description: Student succesvol ingeschreven (en eventueel aangemaakt)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: |
 *           Verplichte velden ontbreken, student niet gevonden zonder student_geboortedatum/student_email,
 *           of instructeur behoort niet tot de opgegeven rijschool
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Rijschool, categorie of instructeur niet gevonden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Serverfout
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   */
  app.post("/api/rijbewijzen/inschrijven_student", controller.inschrijven_student);

  /**
   * @swagger
   * /api/rijbewijzen/inschrijving/{id}/wijzig_advies_theorie:
   *   put:
   *     summary: Wijzig het theorie advies van een inschrijving
   *     tags: [Rijbewijzen]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID van de inschrijving
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/AdviesTheorie'
   *     responses:
   *       200:
   *         description: Advies theorie succesvol bijgewerkt
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SuccessResponse'
   *       400:
   *         description: Verplichte velden ontbreken
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       404:
   *         description: Inschrijving niet gevonden
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Serverfout
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  app.put("/api/rijbewijzen/inschrijving/:id/wijzig_advies_theorie", controller.wijzig_advies_theorie);

  /**
   * @swagger
   * /api/rijbewijzen/inschrijving/{id}/wijzig_advies_praktijk:
   *   put:
   *     summary: Wijzig het praktijk advies van een inschrijving
   *     tags: [Rijbewijzen]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID van de inschrijving
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/AdviesPraktijk'
   *     responses:
   *       200:
   *         description: Advies praktijk succesvol bijgewerkt
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SuccessResponse'
   *       400:
   *         description: Verplichte velden ontbreken
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       404:
   *         description: Inschrijving niet gevonden
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Serverfout
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  app.put("/api/rijbewijzen/inschrijving/:id/wijzig_advies_praktijk", controller.wijzig_advies_praktijk);

  /**
   * @swagger
   * /api/rijbewijzen/aanmelden_student_theorie_examen:
   *   post:
   *     summary: Meld een student aan voor een theorie examen
   *     description: Vereist een positief theorie advies op de inschrijving
   *     tags: [Rijbewijzen]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ExamenAanmelding'
   *     responses:
   *       201:
   *         description: Student succesvol aangemeld voor theorie examen
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SuccessResponse'
   *       400:
   *         description: Verplichte velden ontbreken of geen positief advies
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       404:
   *         description: Inschrijving niet gevonden
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Serverfout
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  app.post("/api/rijbewijzen/aanmelden_student_theorie_examen", controller.aanmelden_student_theorie_examen);

  /**
   * @swagger
   * /api/rijbewijzen/aanmelden_student_praktijk_examen:
   *   post:
   *     summary: Meld een student aan voor een praktijk examen
   *     description: Vereist een positief praktijk advies op de inschrijving
   *     tags: [Rijbewijzen]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ExamenAanmelding'
   *     responses:
   *       201:
   *         description: Student succesvol aangemeld voor praktijk examen
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SuccessResponse'
   *       400:
   *         description: Verplichte velden ontbreken of geen positief advies
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       404:
   *         description: Inschrijving niet gevonden
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Serverfout
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  app.post("/api/rijbewijzen/aanmelden_student_praktijk_examen", controller.aanmelden_student_praktijk_examen);

  /**
   * @swagger
   * /api/rijbewijzen/bewaar_resultaten_theorie_examen:
   *   post:
   *     summary: Bewaar de resultaten van een theorie examen
   *     description: Slaat het resultaat op en markeert de aanmelding als afgenomen
   *     tags: [Rijbewijzen]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/TheorieResultaat'
   *     responses:
   *       201:
   *         description: Theorie examenresultaat succesvol opgeslagen
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SuccessResponse'
   *       400:
   *         description: Verplichte velden ontbreken of aanmelding is niet van type theorie
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       404:
   *         description: Examen aanmelding niet gevonden
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Serverfout
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  app.post("/api/rijbewijzen/bewaar_resultaten_theorie_examen", controller.bewaar_resultaten_theorie_examen);

  /**
   * @swagger
   * /api/rijbewijzen/bewaar_resultaten_praktijk_examen:
   *   post:
   *     summary: Bewaar de resultaten van een praktijk examen
   *     description: Slaat het resultaat inclusief beoordelingsdetails op en markeert de aanmelding als afgenomen
   *     tags: [Rijbewijzen]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PraktijkResultaat'
   *     responses:
   *       201:
   *         description: Praktijk examenresultaat succesvol opgeslagen
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SuccessResponse'
   *       400:
   *         description: Verplichte velden ontbreken of aanmelding is niet van type praktijk
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       404:
   *         description: Examen aanmelding niet gevonden
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Serverfout
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  app.post("/api/rijbewijzen/bewaar_resultaten_praktijk_examen", controller.bewaar_resultaten_praktijk_examen);
};
