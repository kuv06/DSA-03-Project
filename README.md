# 🗺️ TSP Route Planner

A Java-based route planning application that solves the **Travelling Salesman Problem (TSP)** using **Bitmask Dynamic Programming (Held-Karp Algorithm)**, with a scalable heuristic fallback for large inputs and a **Dijkstra's Algorithm** module for point-to-point routing.

Built and tested on a real-world dataset of **100 Indian cities** with a complete pairwise road-distance matrix.

---

## 📌 Overview

The Travelling Salesman Problem asks for the minimum-cost route that visits every city exactly once and returns to the starting point. This project implements and compares multiple algorithmic approaches to TSP:

| Algorithm | Type | Complexity | Used for |
|---|---|---|---|
| Brute Force | Exact | `O((n-1)!)` | Small inputs, baseline comparison |
| **Held-Karp (Bitmask DP)** | Exact | `O(n²·2ⁿ)` | Core algorithm, up to ~20 cities |
| Nearest Neighbor + 2-opt | Heuristic | `O(n²)` | Scales to all 100 cities |
| Dijkstra's Algorithm | Exact (shortest path) | `O(n²)` | Point-to-point routing |

> **Why not pure DP on all 100 cities?** Bitmask DP is exponential — `2¹⁰⁰` subsets is not computable on any existing hardware. This project demonstrates DP correctly at the scale where it's actually exact and fast (n ≤ 20), and uses a heuristic for the full 100-city dataset. The benchmark module makes this trade-off empirically visible.

---

## ✨ Features

- **Full-tour planning** across all 100 cities using a Nearest Neighbor + 2-opt heuristic
- **Custom multi-city routes** — pick any set of cities by name; automatically solved exactly (Held-Karp) if small enough, or heuristically otherwise
- **Point-to-point shortest path** between any two cities via Dijkstra's algorithm, with estimated travel time
- **Exact solvers** (Brute Force, Held-Karp) exposed directly for algorithm comparison and reporting
- **Benchmark mode** comparing runtime and cost of all algorithms across increasing input sizes
- **CSV export** of any computed route for further visualization (e.g. plotting on a map)
- Simple, menu-driven CLI — no algorithm knowledge required to use it

---

## 📂 Project Structure

```
tsp-route-planner/
├── data/
│   └── combined_distance_matrix.csv   # 100 cities, full distance matrix (km)
├── src/
│   ├── City.java                      # City data model
│   ├── DistanceMatrix.java            # CSV loader + subset extraction
│   ├── TSPResult.java                 # Common result type (route, cost, time)
│   ├── BruteForceSolver.java          # Naive O((n-1)!) baseline
│   ├── HeldKarpSolver.java            # Bitmask DP, O(n²·2ⁿ)
│   ├── NearestNeighborSolver.java     # Greedy O(n²) construction heuristic
│   ├── TwoOptOptimizer.java           # Local search improvement
│   ├── ShortestPathSolver.java        # Dijkstra's algorithm
│   ├── BenchmarkRunner.java           # Timing/cost comparison harness
│   └── Main.java                      # CLI entry point
└── README.md
```

---

## 🛠️ Requirements

- Java 11+ (Java 21 recommended)
- A JDK with `javac` (or see the JRE-only workaround below)

---

## 🚀 Getting Started

Clone the repository and navigate into the project folder:

```bash
git clone <your-repo-url>
cd tsp-route-planner
```

### Compile

**macOS / Linux:**
```bash
javac -d out src/*.java
```

**Windows (PowerShell):**
```powershell
javac -d out (Get-ChildItem src\*.java)
```

### Run

```bash
java -cp out Main
```

> If you only have a JRE (no `javac`), Java 21's built-in compiler module can be invoked directly:
> ```bash
> java --add-modules jdk.compiler -m jdk.compiler/com.sun.tools.javac.Main -d out src/*.java
> java -cp out Main
> ```

---

## 💻 Usage

On launch, you'll see:

```
=============== TSP Route Planner ===============
1) Plan the best route through ALL 100 cities
2) Plan the best route through cities I choose
3) Find the shortest route between two cities
4) Technical / algorithm comparison (for the report)
5) Export last route to CSV
0) Exit
===================================================
```

### Option 1 — Full 100-city tour
Runs the Nearest Neighbor + 2-opt heuristic and prints the complete route with total distance:

```
=============== YOUR ROUTE ===============
Stops: 100
Total distance: 14983.1 km
-------------------------------------------
  1. Mumbai (Maharashtra)
  2. Navi Mumbai (Maharashtra)
  ...
100. Vasai (Maharashtra)
     -> back to Mumbai
===========================================
```

### Option 2 — Custom city selection
Type any city names (a directory is printed first):
```
> Mumbai, Delhi, Jaipur, Agra, Lucknow, Kanpur
```
Automatically solved **exactly** via Held-Karp DP if ≤ 20 cities, or via the heuristic otherwise.

### Option 3 — Point-to-point routing
```
Starting city: Chennai
Destination city: Bengaluru
Average travel speed in km/h (press Enter for default 60): 80

=============== SHORTEST ROUTE ===============
From: Chennai (Tamil Nadu)
To:   Bengaluru (Karnataka)
-------------------------------------------------
Path: Chennai -> Bengaluru
Distance: 290.2 km
Estimated travel time: 3 hr 38 min (at 80 km/h)
=================================================
```

### Option 4 — Technical / algorithm comparison
Exposes each solver individually for demonstration and benchmarking:

```
1) Exact: Brute force            (n <= 11 recommended)
2) Exact: Held-Karp bitmask DP    (n <= 20 recommended)
3) Heuristic: Nearest Neighbor + 2-opt on ALL 100 cities
4) Benchmark: compare all three across growing n
```

Sample benchmark output:

```
n    BruteForce(ms) HeldKarp(ms)   NearNeigh(ms)  BruteForce(km) HeldKarp(km)  NearNeigh(km)
4    0.012          0.024          0.004          3748.8         3748.8        4009.3
8    10.555         0.260          0.004          5293.9         5293.9        5293.9
12   -              11.617         0.006          -              5343.9        5775.4
16   -              74.343         0.010          -              6032.8        6541.6
20   -              1068.853       0.017          -              6302.4        6606.4
```

`-` = skipped because `n` exceeded that solver's safe limit. Brute Force and Held-Karp always agree on cost when both run — a built-in correctness check.

### Option 5 — Export
Exports the last computed full-tour route to `route_export.csv` (order, city, state, latitude, longitude) for mapping/visualization.

---

## 🧠 Algorithms in Detail

**Held-Karp (Bitmask DP)**
Represents visited-city subsets as bitmasks and memoizes `dp[mask][j]` — the minimum cost of a path visiting exactly the cities in `mask`, ending at city `j`. Avoids the redundant recomputation of brute force.

**Brute Force**
Tries every permutation of the non-start cities. Used as a naive baseline to demonstrate DP's efficiency gain.

**Nearest Neighbor**
Greedily moves to the closest unvisited city at each step. Fast (`O(n²)`) but not optimal.

**2-opt**
Iteratively reverses tour segments whenever doing so shortens the total distance, cleaning up the Nearest Neighbor tour.

**Dijkstra's Algorithm**
Finds the shortest path between two specific cities by maintaining and relaxing best-known distances — a different problem from the full TSP tour.

---

## 📊 Dataset

`data/combined_distance_matrix.csv` contains 100 Indian cities with:
- `id`, `city`, `state`, `latitude`, `longitude`
- A full 100×100 symmetric road-distance matrix in kilometers

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to fork the repo and submit a pull request.

## 📄 License

This project is available under the MIT License. See `LICENSE` for details.
