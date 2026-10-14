# RouteFleetLab-Full

## Frontend
Sidebar console with four views: Dashboard (analytics, route map, city directory), Route planner, Fleet assignment and Session log. The algorithm code in `frontend/script.js` is unchanged. `frontend/app.js` adds navigation, the analytics and the session log, and `frontend/layout.css` holds the new layout and login screen.

Open `frontend/index.html`. Demo login: admin / admin123.

## Backend Java
Java implementations are in `backend-java/src/`.

## Data
`frontend/data/distances.csv` is the single source of truth: a 100 x 100 road-distance matrix (km) between 100 Indian cities. The city picker lists all 100 cities from its header row.

The browser reads it through `frontend/data/distances.js` (same CSV wrapped in a string so it works when opening `index.html` directly from disk). After editing the CSV, run `python3 tools/build_data.py` to regenerate `distances.js` and the Java copies in `backend-java/data/`.

Java: `DataLoader` reads `backend-java/data/distances.csv`; run `Main` from `backend-java/` with `java -cp out Main`.
