# KPS - Korps Politie Suriname (Afdeling Rijbewijzen)

REST API voor beheer van rijbewijzen, rijscholen, examens en verkeersovertredingen.

## Installatie

```bash
cd app
npm install
```

## Starten

### Development
```bash
npm run dev
```

### Production
```bash
npm run production
```

## API Documentatie

Na het starten van de server is de Swagger documentatie beschikbaar op:
- Development: http://localhost:3001/api/docs
- Production: https://kps-api.gov.sr:3001/api/docs

## Endpoints

### Afdeling Rijbewijzen
- `GET /api/rijbewijs/:identificatienummer` - Ophalen rijbewijs gegevens
- `GET /api/rijbewijs/aanvragen/:identificatienummer` - Ophalen aanvragen
- `GET /api/dossier/:identificatienummer` - Compleet rijbewijs dossier

### Examens & Rijlessen
- `GET /api/rijexamens/:identificatienummer` - Ophalen rijexamens
- `GET /api/rijlessen/:identificatienummer` - Ophalen rijlessen

### Overtredingen
- `GET /api/overtredingen/:identificatienummer` - Ophalen overtredingen

### Rijscholen
- `GET /api/rijscholen` - Alle rijscholen (optioneel filter: ?actief=true)
- `GET /api/rijscholen/:id` - Specifieke rijschool

### Referentiedata
- `GET /api/categorieen` - Rijbewijs categorieen
- `GET /api/rijbewijs-statussen` - Rijbewijs statussen
- `GET /api/aanvraag-statussen` - Aanvraag statussen
- `GET /api/examen-types` - Examen types
- `GET /api/examen-resultaten` - Examen resultaten
- `GET /api/overtreding-types` - Overtreding types
