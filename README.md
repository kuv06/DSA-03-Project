# Smart Route: Dynamic Travelling Salesman Route Planner

Route planning and fleet assignment, implemented twice: as a browser app and as a Java DSA project.

## Overview

This project explores two classic algorithmic problems in a logistics setting: planning the cheapest route through a set of cities, and assigning a fleet of vehicles to customer cities at minimum total cost. Both problems are solved twice, independently:

- **`frontend/`** — an interactive single-page web app where the algorithms are written in JavaScript.
- **`backend-java/`** — the same two algorithms reimplemented as standalone Java classes with a console driver, written for a Data Structures & Algorithms course submission.

Both sides work against the same 100-city dataset (Indian cities, with a full pairwise road-distance matrix), so results can be cross-checked between them.

## Project Structure

```
RouteFleetLab-Full/
├── frontend/                 # Web app (HTML/CSS/JS)
│   ├── index.html
│   ├── style.css
│   └── script.js
├── backend-java/             # Java DSA implementation
│   ├── src/
│   │   ├── City.java
│   │   ├── CityGraph.java
│   │   ├── TSPSolver.java
│   │   ├── MinCostMaxFlow.java
│   │   ├── VehicleType.java
│   │   └── Main.java
│   ├── data/
│   │   ├── cities.csv
│   │   └── distances.csv
│   └── README.md
└── README.md
```

## The Two Algorithms

### Route planning — Held–Karp bitmask DP (TSP)

Given a start city and a set of cities to visit, find the cheapest closed tour that visits every city exactly once and returns to the start. This is the classic Travelling Salesman Problem, solved **exactly** (not heuristically) with Held–Karp dynamic programming over subsets of cities, represented as bitmasks.

- **State:** `dp[mask][j]` = minimum cost to have visited exactly the cities in `mask`, ending at city `j`.
- **Transition:** `dp[mask | (1<<k)][k] = min(dp[mask][j] + dist(j, k))` over all `j` in `mask`, `k` not in `mask`.
- **Complexity:** O(2ⁿ · n²) time, O(2ⁿ · n) space.
- Kept to at most ~13 cities in the console menu, since the state space doubles with every extra city.

| | Location |
|---|---|
| JavaScript | `bitmaskDPTable` / `closedTour` / `openPath` / `reconstructPath` in `frontend/script.js` |
| Java | `TSPSolver.java` — class `TSPSolver`, methods `closedTour`, `openPath`, `buildSubMatrix` |

### Fleet assignment — Minimum-Cost Maximum-Flow

Given a depot, a list of customer cities, and a number of available vehicles, assign customers to vehicles so that every customer is served and total travel distance is minimised. This is modelled as a flow network and solved with the **Successive Shortest Paths** algorithm, using SPFA (queue-based Bellman-Ford) to find each shortest augmenting path so that negative reduced-cost residual edges are handled correctly.

- Network shape: `source → vehicles → customer cities → sink`
- Each `vehicle → source` edge caps how many customers that vehicle can serve.
- Each `vehicle → city` edge is weighted by the travel distance/cost.
- Repeatedly augments flow along the current cheapest path until no augmenting path remains.

| | Location |
|---|---|
| JavaScript | `MinCostMaxFlow` class in `frontend/script.js` |
| Java | `MinCostMaxFlow.java` — class `MinCostMaxFlow`, methods `addEdge`, `solve`, `flowOn` |

## Frontend (`frontend/`)

A self-contained web app — no build step, no server.

| File | Purpose |
|---|---|
| `index.html` | Page markup and layout |
| `style.css` | All styling |
| `script.js` | Both algorithms, city dataset, and UI logic |

**To run:** open `frontend/index.html` directly in a browser (or use an extension like VS Code's Live Server).

## Java Backend (`backend-java/`)

| File | Contents |
|---|---|
| `src/City.java` | Simple city data holder (id, name, state, coordinates) |
| `src/CityGraph.java` | Loads `cities.csv` and `distances.csv`; exposes distance lookups |
| `src/TSPSolver.java` | Held–Karp bitmask DP for closed-tour / open-path routing |
| `src/MinCostMaxFlow.java` | Successive shortest paths (SPFA) min-cost max-flow |
| `src/VehicleType.java` | Vehicle speed/cost profiles for estimates |
| `src/Main.java` | Console menu that drives both algorithms |
| `data/cities.csv` | 100-city dataset (index, id, name, state, lat, lon) |
| `data/distances.csv` | Full 100 × 100 pairwise distance matrix (km) |

### Build & run

Clone the repo, then from the `backend-java/` folder:

```bash
cd backend-java/src
javac -d ../out *.java
cd ..
java -cp out Main
```

> **Windows / PowerShell:** use backslashes for the output path: `javac -d ..\out *.java`.

This compiles every `.java` file in `src/` into an `out/` folder, then runs the `Main` class, which prints an interactive menu: route planner, fleet assignment, or list all cities. Run `java` from `backend-java/` (not from inside `src/`), since `Main.java` loads `data/cities.csv` and `data/distances.csv` using a relative path.

If your terminal reports `javac is not recognized` / `command not found`, you have a JRE but not a JDK — install one (e.g. [Eclipse Temurin](https://adoptium.net/)) and confirm with `javac -version`.

### Using the console menu

1. **Route planner** — enter 2–13 city names, comma-separated, start city first. Prints the optimal closed tour, its distance, and a cost/time estimate.
2. **Fleet assignment** — enter a depot city, a list of customer cities, and a vehicle count. Prints how many cities were served, total distance, and which vehicle was assigned to which cities.
3. **List cities** — prints the full 100-city dataset with indices.

## Data

Both the frontend and the Java backend read from the same source dataset: 100 Indian cities, each with a state and latitude/longitude, plus a full 100×100 pairwise road-distance matrix (in kilometres). In the Java project this is stored as plain CSV (`data/cities.csv`, `data/distances.csv`) so it can be loaded without any external libraries.

## Notes

- The frontend and Java backend are **independent** implementations of the same ideas — neither calls the other.
- The Held–Karp DP is exact, not a heuristic, which is why city counts are capped (2ⁿ growth).
- The min-cost max-flow implementation uses SPFA rather than plain Bellman-Ford or Dijkstra so that negative-cost residual edges (created when flow is pushed) are handled correctly on every iteration.

## License

Add a license of your choice (e.g. MIT) if you plan to make this repo public.
