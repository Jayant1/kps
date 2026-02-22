-- PostgreSQL dump converted from MariaDB
-- Database: rijbewijzenregister

-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS praktijk_examenresultaten_details CASCADE;
DROP TABLE IF EXISTS praktijk_examenresultaten CASCADE;
DROP TABLE IF EXISTS theorie_examenresultaten CASCADE;
DROP TABLE IF EXISTS examen_aanmeldingen CASCADE;
DROP TABLE IF EXISTS rijschool_inschrijvingen CASCADE;
DROP TABLE IF EXISTS rijinstructeurs CASCADE;
DROP TABLE IF EXISTS rijscholen CASCADE;
DROP TABLE IF EXISTS studenten CASCADE;
DROP TABLE IF EXISTS examinatoren CASCADE;
DROP TABLE IF EXISTS surveillanten CASCADE;
DROP TABLE IF EXISTS categorie CASCADE;

-- Drop view if exists
DROP VIEW IF EXISTS v_student_voortgang;

-- Drop custom ENUM types if exist
DROP TYPE IF EXISTS examen_type_enum CASCADE;
DROP TYPE IF EXISTS examen_status_enum CASCADE;
DROP TYPE IF EXISTS advies_enum CASCADE;
DROP TYPE IF EXISTS categorie_opdracht_enum CASCADE;
DROP TYPE IF EXISTS resultaat_enum CASCADE;

-- Create custom ENUM types
CREATE TYPE examen_type_enum AS ENUM ('theorie', 'praktijk');
CREATE TYPE examen_status_enum AS ENUM ('gepland', 'afgenomen', 'geannuleerd');
CREATE TYPE advies_enum AS ENUM ('positief', 'negatief', 'in_behandeling');
CREATE TYPE categorie_opdracht_enum AS ENUM ('verkeersdeelname', 'voertuigbeheersing', 'bijzondere_verrichtingen', 'attitude');
CREATE TYPE resultaat_enum AS ENUM ('goed', 'fout', 'gevaarlijk');

-- ============================================================
-- TABLE STRUCTURE
-- ============================================================

-- Table: categorie
CREATE TABLE categorie (
    id               SERIAL PRIMARY KEY,
    code             VARCHAR(5)   NOT NULL,
    omschrijving     VARCHAR(100) DEFAULT NULL,
    ingevoerd_door   VARCHAR(50)  NOT NULL,
    datum_ingevoerd  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    gewijzigd_door   VARCHAR(50)  DEFAULT NULL,
    datum_gewijzigd  TIMESTAMP    DEFAULT NULL,
    CONSTRAINT categorie_code_unique UNIQUE (code)
);

-- Table: examinatoren
CREATE TABLE examinatoren (
    id                   SERIAL PRIMARY KEY,
    identificatienummer  VARCHAR(30) NOT NULL,
    badge_nr             VARCHAR(30) NOT NULL,
    ingevoerd_door       VARCHAR(50) NOT NULL,
    datum_ingevoerd      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    gewijzigd_door       VARCHAR(50) DEFAULT NULL,
    datum_gewijzigd      TIMESTAMP   DEFAULT NULL,
    CONSTRAINT examinatoren_identificatienummer_unique UNIQUE (identificatienummer),
    CONSTRAINT examinatoren_badge_nr_unique UNIQUE (badge_nr)
);

-- Table: surveillanten
CREATE TABLE surveillanten (
    id                   SERIAL PRIMARY KEY,
    identificatienummer  VARCHAR(30) NOT NULL,
    badge_nr             VARCHAR(30) NOT NULL,
    ingevoerd_door       VARCHAR(50) NOT NULL,
    datum_ingevoerd      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    gewijzigd_door       VARCHAR(50) DEFAULT NULL,
    datum_gewijzigd      TIMESTAMP   DEFAULT NULL,
    CONSTRAINT surveillanten_identificatienummer_unique UNIQUE (identificatienummer),
    CONSTRAINT surveillanten_badge_nr_unique UNIQUE (badge_nr)
);

-- Table: rijscholen
CREATE TABLE rijscholen (
    id               SERIAL PRIMARY KEY,
    naam             VARCHAR(100) NOT NULL,
    adres            VARCHAR(200) DEFAULT NULL,
    telefoon         VARCHAR(20)  DEFAULT NULL,
    email            VARCHAR(100) DEFAULT NULL,
    ingevoerd_door   VARCHAR(50)  NOT NULL,
    datum_ingevoerd  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    gewijzigd_door   VARCHAR(50)  DEFAULT NULL,
    datum_gewijzigd  TIMESTAMP    DEFAULT NULL
);

-- Table: studenten
CREATE TABLE studenten (
    id                   SERIAL PRIMARY KEY,
    identificatienummer  VARCHAR(30)  NOT NULL,
    geboortedatum        DATE         NOT NULL,
    email                VARCHAR(100) NOT NULL,
    telefoon             VARCHAR(20)  DEFAULT NULL,
    adres                VARCHAR(200) DEFAULT NULL,
    ingevoerd_door       VARCHAR(50)  NOT NULL,
    datum_ingevoerd      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    gewijzigd_door       VARCHAR(50)  DEFAULT NULL,
    datum_gewijzigd      TIMESTAMP    DEFAULT NULL,
    CONSTRAINT studenten_identificatienummer_unique UNIQUE (identificatienummer),
    CONSTRAINT studenten_email_unique UNIQUE (email)
);

-- Table: rijinstructeurs
CREATE TABLE rijinstructeurs (
    id                   SERIAL PRIMARY KEY,
    rijschool_id         INT         NOT NULL,
    identificatienummer  VARCHAR(30) NOT NULL,
    licentie_nr          VARCHAR(30) NOT NULL,
    ingevoerd_door       VARCHAR(50) NOT NULL,
    datum_ingevoerd      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    gewijzigd_door       VARCHAR(50) DEFAULT NULL,
    datum_gewijzigd      TIMESTAMP   DEFAULT NULL,
    CONSTRAINT rijinstructeurs_identificatienummer_unique UNIQUE (identificatienummer),
    CONSTRAINT rijinstructeurs_licentie_nr_unique UNIQUE (licentie_nr),
    CONSTRAINT rijinstructeurs_rijschool_fk FOREIGN KEY (rijschool_id) REFERENCES rijscholen (id)
);

-- Table: rijschool_inschrijvingen
CREATE TABLE rijschool_inschrijvingen (
    id                     SERIAL PRIMARY KEY,
    student_id             INT         NOT NULL,
    rijschool_id           INT         NOT NULL,
    instructeur_id         INT         DEFAULT NULL,
    categorie_id           INT         NOT NULL,
    inschrijfdatum         DATE        NOT NULL DEFAULT CURRENT_DATE,
    advies_theorie         advies_enum NOT NULL DEFAULT 'in_behandeling',
    advies_theorie_datum   DATE        DEFAULT NULL,
    advies_praktijk        advies_enum NOT NULL DEFAULT 'in_behandeling',
    advies_praktijk_datum  DATE        DEFAULT NULL,
    ingevoerd_door         VARCHAR(50) NOT NULL,
    datum_ingevoerd        TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    gewijzigd_door         VARCHAR(50) DEFAULT NULL,
    datum_gewijzigd        TIMESTAMP   DEFAULT NULL,
    CONSTRAINT rijschool_inschrijvingen_student_categorie_unique UNIQUE (student_id, categorie_id),
    CONSTRAINT rijschool_inschrijvingen_student_fk     FOREIGN KEY (student_id)     REFERENCES studenten (id),
    CONSTRAINT rijschool_inschrijvingen_rijschool_fk   FOREIGN KEY (rijschool_id)   REFERENCES rijscholen (id),
    CONSTRAINT rijschool_inschrijvingen_instructeur_fk FOREIGN KEY (instructeur_id) REFERENCES rijinstructeurs (id),
    CONSTRAINT rijschool_inschrijvingen_categorie_fk   FOREIGN KEY (categorie_id)   REFERENCES categorie (id)
);

-- Table: examen_aanmeldingen
CREATE TABLE examen_aanmeldingen (
    id               SERIAL PRIMARY KEY,
    inschrijving_id  INT                NOT NULL,
    examen_type      examen_type_enum   NOT NULL,
    gekozen_datum    TIMESTAMP          NOT NULL,
    locatie          VARCHAR(150)       DEFAULT NULL,
    aangemeld_op     TIMESTAMP          NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status           examen_status_enum NOT NULL DEFAULT 'gepland',
    ingevoerd_door   VARCHAR(50)        NOT NULL,
    datum_ingevoerd  TIMESTAMP          NOT NULL DEFAULT CURRENT_TIMESTAMP,
    gewijzigd_door   VARCHAR(50)        DEFAULT NULL,
    datum_gewijzigd  TIMESTAMP          DEFAULT NULL,
    CONSTRAINT examen_aanmeldingen_inschrijving_fk FOREIGN KEY (inschrijving_id) REFERENCES rijschool_inschrijvingen (id)
);

-- Table: praktijk_examenresultaten
CREATE TABLE praktijk_examenresultaten (
    id                  SERIAL PRIMARY KEY,
    aanmelding_id       INT          NOT NULL,
    examinator_id       INT          NOT NULL,
    afgenomen_op        DATE         NOT NULL,
    route_omschrijving  VARCHAR(200) DEFAULT NULL,
    rijtijd_minuten     INT          DEFAULT NULL,
    geslaagd            BOOLEAN      NOT NULL,
    opmerkingen         TEXT         DEFAULT NULL,
    ingevoerd_door      VARCHAR(50)  NOT NULL,
    datum_ingevoerd     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    gewijzigd_door      VARCHAR(50)  DEFAULT NULL,
    datum_gewijzigd     TIMESTAMP    DEFAULT NULL,
    CONSTRAINT praktijk_examenresultaten_aanmelding_unique UNIQUE (aanmelding_id),
    CONSTRAINT praktijk_examenresultaten_aanmelding_fk FOREIGN KEY (aanmelding_id) REFERENCES examen_aanmeldingen (id),
    CONSTRAINT praktijk_examenresultaten_examinator_fk FOREIGN KEY (examinator_id) REFERENCES examinatoren (id)
);

-- Table: praktijk_examenresultaten_details
CREATE TABLE praktijk_examenresultaten_details (
    id                     SERIAL PRIMARY KEY,
    praktijk_resultaat_id  INT                     NOT NULL,
    volgorde               INT                     DEFAULT NULL,
    type_opdracht          VARCHAR(100)            NOT NULL,
    categorie_opdracht     categorie_opdracht_enum DEFAULT NULL,
    resultaat              resultaat_enum          NOT NULL,
    notitie                TEXT                    DEFAULT NULL,
    ingevoerd_door         VARCHAR(50)             NOT NULL,
    datum_ingevoerd        TIMESTAMP               NOT NULL DEFAULT CURRENT_TIMESTAMP,
    gewijzigd_door         VARCHAR(50)             DEFAULT NULL,
    datum_gewijzigd        TIMESTAMP               DEFAULT NULL,
    CONSTRAINT praktijk_examenresultaten_details_resultaat_fk FOREIGN KEY (praktijk_resultaat_id) REFERENCES praktijk_examenresultaten (id)
);

-- Table: theorie_examenresultaten
CREATE TABLE theorie_examenresultaten (
    id               SERIAL PRIMARY KEY,
    aanmelding_id    INT         NOT NULL,
    surveillant_id   INT         DEFAULT NULL,
    afgenomen_op     DATE        NOT NULL,
    score            INT         DEFAULT NULL,
    max_score        INT         DEFAULT NULL,
    geslaagd         BOOLEAN     NOT NULL,
    opmerkingen      TEXT        DEFAULT NULL,
    ingevoerd_door   VARCHAR(50) NOT NULL,
    datum_ingevoerd  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    gewijzigd_door   VARCHAR(50) DEFAULT NULL,
    datum_gewijzigd  TIMESTAMP   DEFAULT NULL,
    CONSTRAINT theorie_examenresultaten_aanmelding_unique UNIQUE (aanmelding_id),
    CONSTRAINT theorie_examenresultaten_aanmelding_fk  FOREIGN KEY (aanmelding_id)  REFERENCES examen_aanmeldingen (id),
    CONSTRAINT theorie_examenresultaten_surveillant_fk FOREIGN KEY (surveillant_id) REFERENCES surveillanten (id)
);

-- ============================================================
-- SEED DATA - Fictieve testdata
-- ============================================================

-- Categorie
INSERT INTO categorie (id, code, omschrijving, ingevoerd_door, datum_ingevoerd, gewijzigd_door, datum_gewijzigd) VALUES
(1, 'B',  'Personenauto',               'SYSTEEM', '2026-02-17 19:40:15', NULL, NULL),
(2, 'A',  'Motorfiets',                 'SYSTEEM', '2026-02-17 19:40:15', NULL, NULL),
(3, 'C',  'Vrachtwagen',                'SYSTEEM', '2026-02-17 19:40:15', NULL, NULL),
(4, 'D',  'Bus',                        'SYSTEEM', '2026-02-17 19:40:15', NULL, NULL),
(5, 'BE', 'Personenauto met aanhanger', 'SYSTEEM', '2026-02-17 19:40:15', NULL, NULL);

SELECT setval('categorie_id_seq', (SELECT MAX(id) FROM categorie));

-- Rijscholen
INSERT INTO rijscholen (id, naam, adres, telefoon, email, ingevoerd_door, datum_ingevoerd) VALUES
(1, 'Rijschool De Palmboom',    'Kernkampweg 12, Paramaribo',       '597-123456', 'info@palmboom.sr',  'SYSTEEM', CURRENT_TIMESTAMP),
(2, 'Rijschool Suriname Drive', 'Tourtonnelaan 45, Paramaribo',     '597-234567', 'info@srdrive.sr',   'SYSTEEM', CURRENT_TIMESTAMP),
(3, 'Rijschool Comfort',        'Indira Gandhiweg 88, Paramaribo',  '597-345678', 'info@comfort.sr',   'SYSTEEM', CURRENT_TIMESTAMP);

SELECT setval('rijscholen_id_seq', (SELECT MAX(id) FROM rijscholen));

-- Rijinstructeurs
INSERT INTO rijinstructeurs (id, rijschool_id, identificatienummer, licentie_nr, ingevoerd_door, datum_ingevoerd) VALUES
(1, 1, 'IC001985', 'LIC-2021-001', 'SYSTEEM', CURRENT_TIMESTAMP),
(2, 1, 'IC002310', 'LIC-2021-002', 'SYSTEEM', CURRENT_TIMESTAMP),
(3, 2, 'IC003874', 'LIC-2022-003', 'SYSTEEM', CURRENT_TIMESTAMP),
(4, 3, 'IC004561', 'LIC-2022-004', 'SYSTEEM', CURRENT_TIMESTAMP);

SELECT setval('rijinstructeurs_id_seq', (SELECT MAX(id) FROM rijinstructeurs));

-- Examinatoren
INSERT INTO examinatoren (id, identificatienummer, badge_nr, ingevoerd_door, datum_ingevoerd) VALUES
(1, 'IC007890', 'BADGE-EX-001', 'SYSTEEM', CURRENT_TIMESTAMP),
(2, 'IC008123', 'BADGE-EX-002', 'SYSTEEM', CURRENT_TIMESTAMP),
(3, 'IC009456', 'BADGE-EX-003', 'SYSTEEM', CURRENT_TIMESTAMP);

SELECT setval('examinatoren_id_seq', (SELECT MAX(id) FROM examinatoren));

-- Surveillanten
INSERT INTO surveillanten (id, identificatienummer, badge_nr, ingevoerd_door, datum_ingevoerd) VALUES
(1, 'IC005101', 'BADGE-SV-001', 'SYSTEEM', CURRENT_TIMESTAMP),
(2, 'IC005202', 'BADGE-SV-002', 'SYSTEEM', CURRENT_TIMESTAMP),
(3, 'IC005303', 'BADGE-SV-003', 'SYSTEEM', CURRENT_TIMESTAMP);

SELECT setval('surveillanten_id_seq', (SELECT MAX(id) FROM surveillanten));

-- Studenten
INSERT INTO studenten (id, identificatienummer, geboortedatum, email, telefoon, adres, ingevoerd_door, datum_ingevoerd) VALUES
(1, 'IC010001', '1995-03-12', 'aisha.ramdien@email.sr',  '597-611001', 'Hofstraat 5, Paramaribo',              'SYSTEEM', CURRENT_TIMESTAMP),
(2, 'IC010002', '1998-11-07', 'kevin.brunings@email.sr', '597-611002', 'Zwartenhovenbrugstraat 22, Paramaribo', 'SYSTEEM', CURRENT_TIMESTAMP),
(3, 'IC010003', '2001-02-25', 'priya.sewdien@email.sr',  '597-611003', 'Verlengde Gemenelandsweg 10, Para',     'SYSTEEM', CURRENT_TIMESTAMP),
(4, 'IC010004', '1992-08-14', 'marco.telgt@email.sr',    '597-611004', 'Henck Arronstraat 77, Paramaribo',      'SYSTEEM', CURRENT_TIMESTAMP),
(5, 'IC010005', '2003-06-01', 'fatima.alibaks@email.sr', '597-611005', 'Domineestraat 33, Paramaribo',          'SYSTEEM', CURRENT_TIMESTAMP),
(6, 'IC010006', '1999-12-30', 'dion.pinas@email.sr',     '597-611006', 'Kwattaweg 120, Paramaribo',             'SYSTEEM', CURRENT_TIMESTAMP);

SELECT setval('studenten_id_seq', (SELECT MAX(id) FROM studenten));

-- Rijschool inschrijvingen
-- categorie_id: 1=B, 2=A, 3=C, 4=D, 5=BE
INSERT INTO rijschool_inschrijvingen (id, student_id, rijschool_id, instructeur_id, categorie_id, inschrijfdatum, advies_theorie, advies_theorie_datum, advies_praktijk, advies_praktijk_datum, ingevoerd_door, datum_ingevoerd) VALUES
(1, 1, 1, 1, 1, '2025-09-01', 'positief',       '2025-10-15', 'positief',       '2025-11-20', 'SYSTEEM', CURRENT_TIMESTAMP),
(2, 2, 1, 1, 1, '2025-09-05', 'positief',       '2025-10-18', 'in_behandeling', NULL,         'SYSTEEM', CURRENT_TIMESTAMP),
(3, 3, 2, 3, 1, '2025-10-01', 'negatief',       '2025-11-05', 'in_behandeling', NULL,         'SYSTEEM', CURRENT_TIMESTAMP),
(4, 4, 2, 3, 2, '2025-08-15', 'positief',       '2025-09-20', 'positief',       '2025-10-30', 'SYSTEEM', CURRENT_TIMESTAMP),
(5, 5, 3, 4, 1, '2025-11-01', 'in_behandeling', NULL,         'in_behandeling', NULL,         'SYSTEEM', CURRENT_TIMESTAMP),
(6, 6, 3, 4, 3, '2025-07-10', 'positief',       '2025-08-25', 'positief',       '2025-09-15', 'SYSTEEM', CURRENT_TIMESTAMP);

SELECT setval('rijschool_inschrijvingen_id_seq', (SELECT MAX(id) FROM rijschool_inschrijvingen));

-- Examen aanmeldingen
INSERT INTO examen_aanmeldingen (id, inschrijving_id, examen_type, gekozen_datum, locatie, aangemeld_op, status, ingevoerd_door, datum_ingevoerd) VALUES
(1,  1, 'theorie',  '2025-10-10 09:00:00', 'CBB Examenlokaal A, Paramaribo', '2025-09-20 08:00:00', 'afgenomen', 'SYSTEEM', CURRENT_TIMESTAMP),
(2,  1, 'praktijk', '2025-11-15 10:00:00', 'CBB Rijbaan Noord, Paramaribo',  '2025-10-25 08:00:00', 'afgenomen', 'SYSTEEM', CURRENT_TIMESTAMP),
(3,  2, 'theorie',  '2025-10-12 09:00:00', 'CBB Examenlokaal A, Paramaribo', '2025-09-22 08:00:00', 'afgenomen', 'SYSTEEM', CURRENT_TIMESTAMP),
(4,  2, 'praktijk', '2025-11-20 10:00:00', 'CBB Rijbaan Noord, Paramaribo',  '2025-10-28 08:00:00', 'gepland',   'SYSTEEM', CURRENT_TIMESTAMP),
(5,  3, 'theorie',  '2025-11-01 09:00:00', 'CBB Examenlokaal B, Paramaribo', '2025-10-10 08:00:00', 'afgenomen', 'SYSTEEM', CURRENT_TIMESTAMP),
(6,  3, 'theorie',  '2025-12-01 09:00:00', 'CBB Examenlokaal B, Paramaribo', '2025-11-10 08:00:00', 'gepland',   'SYSTEEM', CURRENT_TIMESTAMP),
(7,  4, 'theorie',  '2025-09-15 09:00:00', 'CBB Examenlokaal A, Paramaribo', '2025-08-25 08:00:00', 'afgenomen', 'SYSTEEM', CURRENT_TIMESTAMP),
(8,  4, 'praktijk', '2025-10-25 10:00:00', 'CBB Rijbaan Zuid, Paramaribo',   '2025-10-01 08:00:00', 'afgenomen', 'SYSTEEM', CURRENT_TIMESTAMP),
(9,  6, 'theorie',  '2025-08-20 09:00:00', 'CBB Examenlokaal A, Paramaribo', '2025-08-01 08:00:00', 'afgenomen', 'SYSTEEM', CURRENT_TIMESTAMP),
(10, 6, 'praktijk', '2025-09-10 10:00:00', 'CBB Rijbaan Noord, Paramaribo',  '2025-08-20 08:00:00', 'afgenomen', 'SYSTEEM', CURRENT_TIMESTAMP);

SELECT setval('examen_aanmeldingen_id_seq', (SELECT MAX(id) FROM examen_aanmeldingen));

-- Theorie examenresultaten
INSERT INTO theorie_examenresultaten (id, aanmelding_id, surveillant_id, afgenomen_op, score, max_score, geslaagd, opmerkingen, ingevoerd_door, datum_ingevoerd) VALUES
(1, 1, 1, '2025-10-10', 38, 50, TRUE,  NULL,                         'SYSTEEM', CURRENT_TIMESTAMP),
(2, 3, 1, '2025-10-12', 41, 50, TRUE,  NULL,                         'SYSTEEM', CURRENT_TIMESTAMP),
(3, 5, 2, '2025-11-01', 22, 50, FALSE, 'Onvoldoende score behaald',  'SYSTEEM', CURRENT_TIMESTAMP),
(4, 7, 2, '2025-09-15', 45, 50, TRUE,  NULL,                         'SYSTEEM', CURRENT_TIMESTAMP),
(5, 9, 3, '2025-08-20', 39, 50, TRUE,  NULL,                         'SYSTEEM', CURRENT_TIMESTAMP);

SELECT setval('theorie_examenresultaten_id_seq', (SELECT MAX(id) FROM theorie_examenresultaten));

-- Praktijk examenresultaten
INSERT INTO praktijk_examenresultaten (id, aanmelding_id, examinator_id, afgenomen_op, route_omschrijving, rijtijd_minuten, geslaagd, opmerkingen, ingevoerd_door, datum_ingevoerd) VALUES
(1, 2,  1, '2025-11-15', 'Route centrum - Kwattaweg - terugkeer via Indira Gandhiweg', 45, TRUE,  NULL,                         'SYSTEEM', CURRENT_TIMESTAMP),
(2, 8,  1, '2025-10-25', 'Route Tourtonnelaan - ringweg - Kernkampweg',                 50, TRUE,  NULL,                         'SYSTEEM', CURRENT_TIMESTAMP),
(3, 10, 2, '2025-09-10', 'Route centrum - Dr. Sophie Redmondstraat - Ringweg',          40, FALSE, 'Fout bij voorrang verlenen', 'SYSTEEM', CURRENT_TIMESTAMP);

SELECT setval('praktijk_examenresultaten_id_seq', (SELECT MAX(id) FROM praktijk_examenresultaten));

-- Praktijk examenresultaten details
INSERT INTO praktijk_examenresultaten_details (praktijk_resultaat_id, volgorde, type_opdracht, categorie_opdracht, resultaat, notitie, ingevoerd_door, datum_ingevoerd) VALUES
(1, 1, 'Optrekken en stoppen',        'voertuigbeheersing',       'goed',      NULL,                     'SYSTEEM', CURRENT_TIMESTAMP),
(1, 2, 'Voorrang verlenen',           'verkeersdeelname',         'goed',      NULL,                     'SYSTEEM', CURRENT_TIMESTAMP),
(1, 3, 'Inhalen',                     'verkeersdeelname',         'goed',      NULL,                     'SYSTEEM', CURRENT_TIMESTAMP),
(1, 4, 'Parkeren',                    'bijzondere_verrichtingen', 'goed',      NULL,                     'SYSTEEM', CURRENT_TIMESTAMP),
(1, 5, 'Rijgedrag in verkeer',        'attitude',                 'goed',      NULL,                     'SYSTEEM', CURRENT_TIMESTAMP),
(2, 1, 'Optrekken en stoppen',        'voertuigbeheersing',       'goed',      NULL,                     'SYSTEEM', CURRENT_TIMESTAMP),
(2, 2, 'Voorrang verlenen',           'verkeersdeelname',         'goed',      NULL,                     'SYSTEEM', CURRENT_TIMESTAMP),
(2, 3, 'Keren',                       'bijzondere_verrichtingen', 'goed',      NULL,                     'SYSTEEM', CURRENT_TIMESTAMP),
(2, 4, 'Rijgedrag in verkeer',        'attitude',                 'goed',      NULL,                     'SYSTEEM', CURRENT_TIMESTAMP),
(3, 1, 'Optrekken en stoppen',        'voertuigbeheersing',       'goed',      NULL,                     'SYSTEEM', CURRENT_TIMESTAMP),
(3, 2, 'Voorrang verlenen kruispunt', 'verkeersdeelname',         'fout',      'Voorrang niet verleend', 'SYSTEEM', CURRENT_TIMESTAMP),
(3, 3, 'Inhalen',                     'verkeersdeelname',         'gevaarlijk','Gevaarlijk ingehaald',   'SYSTEEM', CURRENT_TIMESTAMP),
(3, 4, 'Rijgedrag in verkeer',        'attitude',                 'goed',      NULL,                     'SYSTEEM', CURRENT_TIMESTAMP);

-- ============================================================
-- VIEW
-- ============================================================

CREATE OR REPLACE VIEW v_student_voortgang AS
SELECT
    s.id                    AS student_id,
    s.identificatienummer   AS student_id_nr,
    c.code                  AS categorie,
    i.advies_theorie        AS advies_theorie,
    i.advies_praktijk       AS advies_praktijk,
    COUNT(DISTINCT CASE WHEN a.examen_type = 'theorie'  THEN a.id END)                        AS theorie_pogingen,
    MAX(CASE WHEN a.examen_type = 'theorie'  THEN tr.geslaagd::int END)::boolean               AS theorie_geslaagd,
    COUNT(DISTINCT CASE WHEN a.examen_type = 'praktijk' THEN a.id END)                        AS praktijk_pogingen,
    MAX(CASE WHEN a.examen_type = 'praktijk' THEN pr.geslaagd::int END)::boolean               AS praktijk_geslaagd
FROM studenten s
JOIN rijschool_inschrijvingen i     ON i.student_id      = s.id
JOIN categorie c                    ON c.id              = i.categorie_id
LEFT JOIN examen_aanmeldingen a     ON a.inschrijving_id = i.id
LEFT JOIN theorie_examenresultaten  tr ON tr.aanmelding_id = a.id
LEFT JOIN praktijk_examenresultaten pr ON pr.aanmelding_id = a.id
GROUP BY s.id, s.identificatienummer, c.code, i.advies_theorie, i.advies_praktijk;
