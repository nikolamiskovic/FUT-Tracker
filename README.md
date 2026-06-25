# FUT-Tracker är en React-baserad webbapplikation för att följa fotbollsligor, lag, spelare och World Cup 2026.

## Funktioner

- Visa ligatabeller för:
  - Premier League
  - La Liga
  - Bundesliga
  - Serie A
  - Ligue 1

 Sök efter lag
- Sök efter spelare
- Visa kommande och tidigare matcher
- Spara favoritligor och favoritlag
- World Cup 2026:
  - Gruppspel
  - Tabeller
  - Matcher

---

## Tekniker

- React 18
- Vite
- React Router
- Context API
- LocalStorage
- TheSportsDB API
- Football Data API

---

## Installation

### 1. Klona projektet

```bash
git clone <repository-url>
```

### 2. Gå in i projektmappen

```bash
cd football-match-tracker
```

### 3. Installera beroenden

```bash
npm install
```

### 4. Skapa en .env-fil i projektets rot

Skapa filen:

```bash
.env
```

Lägg in följande:

```env
VITE_FOOTBALL_DATA_KEY=DIN_API_NYCKEL_HÄR (nyckeln medskickad i kommentarerna)
Viktigt också att lägga env filen i football-match-tracker mappen
```

API-nyckeln hämtas från:

https://www.football-data.org/

---

## Starta projektet

```bash
npm run dev
```

Öppna sedan:

```text
http://localhost:5173
```