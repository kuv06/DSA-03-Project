"""Regenerates frontend/data/distances.js and backend-java/data/*.csv from frontend/data/distances.csv."""
import csv, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
src = root / "frontend" / "data" / "distances.csv"
txt = src.read_text(encoding="utf-8-sig").strip()
(root / "frontend" / "data" / "distances.js").write_text(
    "// Generated from distances.csv -- re-run tools/build_data.py after editing the CSV.\n"
    "const DISTANCE_CSV = `" + txt + "\n`;\n", encoding="utf-8")
rows = list(csv.reader(txt.splitlines()))
names = rows[0][1:]
be = root / "backend-java" / "data"
(be / "distances.csv").write_text(txt + "\n", encoding="utf-8")
(be / "cities.csv").write_text("id,name\n" + "".join(f"{i},{n}\n" for i, n in enumerate(names)), encoding="utf-8")
print("cities:", len(names))
