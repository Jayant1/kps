/**
 * @swagger
 * components:
 *   schemas:
 *     Rijbewijs:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         identificatienummer_houder:
 *           type: string
 *         rijbewijs_nummer:
 *           type: string
 *         uitgiftedatum:
 *           type: string
 *           format: date
 *         vervaldatum:
 *           type: string
 *           format: date
 *         uitgegeven_door:
 *           type: string
 *         opmerkingen:
 *           type: string
 *         status:
 *           $ref: '#/components/schemas/RijbewijsStatus'
 *         categorieen:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RijbewijsCategorieKoppeling'
 *         overtredingen:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Overtreding'
 *     RijbewijsStatus:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         naam:
 *           type: string
 *     RijbewijsCategorie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         code:
 *           type: string
 *         omschrijving:
 *           type: string
 *         min_leeftijd:
 *           type: integer
 *     RijbewijsCategorieKoppeling:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         behaald_op:
 *           type: string
 *           format: date
 *         geldig_tot:
 *           type: string
 *           format: date
 *         categorie:
 *           $ref: '#/components/schemas/RijbewijsCategorie'
 *     RijbewijsAanvraag:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         identificatienummer_aanvrager:
 *           type: string
 *         aanvraag_datum:
 *           type: string
 *           format: date
 *         besluit_datum:
 *           type: string
 *           format: date
 *         datum_medische_keuring:
 *           type: string
 *           format: date-time
 *         opmerkingen:
 *           type: string
 *         categorie:
 *           $ref: '#/components/schemas/RijbewijsCategorie'
 *         status:
 *           $ref: '#/components/schemas/AanvraagStatus'
 *     AanvraagStatus:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         naam:
 *           type: string
 *     Rijexamen:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         identificatienummer_kandidaat:
 *           type: string
 *         examen_datum:
 *           type: string
 *           format: date-time
 *         locatie:
 *           type: string
 *         score:
 *           type: integer
 *         opmerkingen:
 *           type: string
 *         categorie:
 *           $ref: '#/components/schemas/RijbewijsCategorie'
 *         examen_type:
 *           $ref: '#/components/schemas/ExamenType'
 *         resultaat:
 *           $ref: '#/components/schemas/ExamenResultaat'
 *         instructeur:
 *           $ref: '#/components/schemas/Instructeur'
 *     ExamenType:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         naam:
 *           type: string
 *     ExamenResultaat:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         naam:
 *           type: string
 *     Rijles:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         identificatienummer_leerling:
 *           type: string
 *         les_datum:
 *           type: string
 *           format: date-time
 *         les_duur_minuten:
 *           type: integer
 *         opmerkingen:
 *           type: string
 *         rijschool:
 *           $ref: '#/components/schemas/Rijschool'
 *         instructeur:
 *           $ref: '#/components/schemas/Instructeur'
 *         categorie:
 *           $ref: '#/components/schemas/RijbewijsCategorie'
 *     Rijschool:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         naam:
 *           type: string
 *         adres:
 *           type: string
 *         distrikt:
 *           type: string
 *         wijk:
 *           type: string
 *         kvk_nummer:
 *           type: string
 *         vergunning_nummer:
 *           type: string
 *         vergunning_geldig_tot:
 *           type: string
 *           format: date
 *         telefoon:
 *           type: string
 *         email:
 *           type: string
 *         actief:
 *           type: boolean
 *         instructeurs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Instructeur'
 *     Instructeur:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         identificatienummer_instructeur:
 *           type: string
 *         certificaat_nummer:
 *           type: string
 *         certificaat_geldig_tot:
 *           type: string
 *           format: date
 *         bevoegde_categorieen:
 *           type: string
 *         actief:
 *           type: boolean
 *         rijschool:
 *           $ref: '#/components/schemas/Rijschool'
 *     Overtreding:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         identificatienummer_overtreder:
 *           type: string
 *         overtreding_datum:
 *           type: string
 *           format: date-time
 *         locatie:
 *           type: string
 *         boete_bedrag:
 *           type: number
 *         proces_verbaal_nummer:
 *           type: string
 *         opmerkingen:
 *           type: string
 *         rijbewijs:
 *           $ref: '#/components/schemas/Rijbewijs'
 *         overtreding_type:
 *           $ref: '#/components/schemas/OvertredingType'
 *     OvertredingType:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         code:
 *           type: string
 *         omschrijving:
 *           type: string
 *     CompleetDossier:
 *       type: object
 *       properties:
 *         identificatienummer:
 *           type: string
 *         rijbewijs:
 *           $ref: '#/components/schemas/Rijbewijs'
 *         aanvragen:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RijbewijsAanvraag'
 *         examens:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Rijexamen'
 *         rijlessen:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Rijles'
 */

const controller = require("../controller/rijbewijzen.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * @swagger
   * /api/rijbewijs/{identificatienummer}:
   *   get:
   *     summary: Ophalen van rijbewijs gegevens
   *     description: Haalt alle rijbewijs gegevens op van een persoon op basis van identificatienummer, inclusief categorieen en overtredingen
   *     tags: [Rijbewijzen]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de houder
   *     responses:
   *       200:
   *         description: Rijbewijs gegevens succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/components/schemas/Rijbewijs'
   *       400:
   *         description: Identificatienummer is verplicht
   *       404:
   *         description: Rijbewijs niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/rijbewijs/:identificatienummer",
    controller.ophaalRijbewijsGegevens
  );

  /**
   * @swagger
   * /api/rijbewijs/aanvragen/{identificatienummer}:
   *   get:
   *     summary: Ophalen van rijbewijs aanvragen
   *     description: Haalt alle rijbewijs aanvragen op van een persoon
   *     tags: [Rijbewijzen]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de aanvrager
   *     responses:
   *       200:
   *         description: Aanvragen succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/RijbewijsAanvraag'
   *       400:
   *         description: Identificatienummer is verplicht
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/rijbewijs/aanvragen/:identificatienummer",
    controller.ophaalRijbewijsAanvragen
  );

  /**
   * @swagger
   * /api/rijexamens/{identificatienummer}:
   *   get:
   *     summary: Ophalen van rijexamens
   *     description: Haalt alle rijexamens op van een kandidaat
   *     tags: [Examens]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de kandidaat
   *     responses:
   *       200:
   *         description: Examens succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Rijexamen'
   *       400:
   *         description: Identificatienummer is verplicht
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/rijexamens/:identificatienummer",
    controller.ophaalRijexamens
  );

  /**
   * @swagger
   * /api/rijlessen/{identificatienummer}:
   *   get:
   *     summary: Ophalen van rijlessen
   *     description: Haalt alle rijlessen op van een leerling
   *     tags: [Rijlessen]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de leerling
   *     responses:
   *       200:
   *         description: Rijlessen succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Rijles'
   *       400:
   *         description: Identificatienummer is verplicht
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/rijlessen/:identificatienummer",
    controller.ophaalRijlessen
  );

  /**
   * @swagger
   * /api/overtredingen/{identificatienummer}:
   *   get:
   *     summary: Ophalen van overtredingen
   *     description: Haalt alle verkeersovertredingen op van een persoon
   *     tags: [Overtredingen]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de overtreder
   *     responses:
   *       200:
   *         description: Overtredingen succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Overtreding'
   *       400:
   *         description: Identificatienummer is verplicht
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/overtredingen/:identificatienummer",
    controller.ophaalOvertredingen
  );

  /**
   * @swagger
   * /api/rijscholen:
   *   get:
   *     summary: Ophalen van alle rijscholen
   *     description: Haalt alle rijscholen op, optioneel gefilterd op actief status
   *     tags: [Rijscholen]
   *     parameters:
   *       - in: query
   *         name: actief
   *         schema:
   *           type: boolean
   *         description: Filter op actieve rijscholen (true/false)
   *     responses:
   *       200:
   *         description: Rijscholen succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Rijschool'
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/rijscholen",
    controller.ophaalRijscholen
  );

  /**
   * @swagger
   * /api/rijscholen/{id}:
   *   get:
   *     summary: Ophalen van een specifieke rijschool
   *     description: Haalt details op van een rijschool inclusief instructeurs
   *     tags: [Rijscholen]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Het ID van de rijschool
   *     responses:
   *       200:
   *         description: Rijschool succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/components/schemas/Rijschool'
   *       404:
   *         description: Rijschool niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/rijscholen/:id",
    controller.ophaalRijschoolById
  );

  /**
   * @swagger
   * /api/categorieen:
   *   get:
   *     summary: Ophalen van alle rijbewijs categorieen
   *     description: Haalt alle beschikbare rijbewijs categorieen op (A, B, C, etc.)
   *     tags: [Referentiedata]
   *     responses:
   *       200:
   *         description: Categorieen succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/RijbewijsCategorie'
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/categorieen",
    controller.ophaalCategorieen
  );

  /**
   * @swagger
   * /api/rijbewijs-statussen:
   *   get:
   *     summary: Ophalen van alle rijbewijs statussen
   *     description: Haalt alle mogelijke rijbewijs statussen op
   *     tags: [Referentiedata]
   *     responses:
   *       200:
   *         description: Statussen succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/RijbewijsStatus'
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/rijbewijs-statussen",
    controller.ophaalStatussen
  );

  /**
   * @swagger
   * /api/aanvraag-statussen:
   *   get:
   *     summary: Ophalen van alle aanvraag statussen
   *     description: Haalt alle mogelijke aanvraag statussen op
   *     tags: [Referentiedata]
   *     responses:
   *       200:
   *         description: Statussen succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/AanvraagStatus'
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/aanvraag-statussen",
    controller.ophaalAanvraagStatussen
  );

  /**
   * @swagger
   * /api/examen-types:
   *   get:
   *     summary: Ophalen van alle examen types
   *     description: Haalt alle mogelijke examen types op (theorie, praktijk, etc.)
   *     tags: [Referentiedata]
   *     responses:
   *       200:
   *         description: Examen types succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/ExamenType'
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/examen-types",
    controller.ophaalExamenTypes
  );

  /**
   * @swagger
   * /api/examen-resultaten:
   *   get:
   *     summary: Ophalen van alle examen resultaten
   *     description: Haalt alle mogelijke examen resultaten op (geslaagd, gezakt, etc.)
   *     tags: [Referentiedata]
   *     responses:
   *       200:
   *         description: Examen resultaten succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/ExamenResultaat'
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/examen-resultaten",
    controller.ophaalExamenResultaten
  );

  /**
   * @swagger
   * /api/overtreding-types:
   *   get:
   *     summary: Ophalen van alle overtreding types
   *     description: Haalt alle mogelijke overtreding types op
   *     tags: [Referentiedata]
   *     responses:
   *       200:
   *         description: Overtreding types succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/OvertredingType'
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/overtreding-types",
    controller.ophaalOvertredingTypes
  );

  /**
   * @swagger
   * /api/dossier/{identificatienummer}:
   *   get:
   *     summary: Ophalen van compleet rijbewijs dossier
   *     description: Haalt het complete rijbewijs dossier op van een persoon, inclusief rijbewijs, aanvragen, examens en rijlessen
   *     tags: [Rijbewijzen]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de persoon
   *     responses:
   *       200:
   *         description: Compleet dossier succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/components/schemas/CompleetDossier'
   *       400:
   *         description: Identificatienummer is verplicht
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/dossier/:identificatienummer",
    controller.ophaalCompleetDossier
  );
};
