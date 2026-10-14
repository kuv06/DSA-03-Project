import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

/** Loads the 100 cities and the distance matrix from data/distances.csv. */
public class DataLoader {
    public static List<City> loadCities(Path csv) throws IOException {
        String[] header = readLines(csv).get(0).split(",");
        List<City> cities = new ArrayList<>();
        for (int i = 1; i < header.length; i++) cities.add(new City(i - 1, header[i].trim()));
        return cities;
    }

    public static CityGraph loadGraph(Path csv) throws IOException {
        List<String> lines = readLines(csv);
        int n = lines.get(0).split(",").length - 1;
        double[][] d = new double[n][n];
        for (int i = 0; i < n; i++) {
            String[] cells = lines.get(i + 1).split(",");
            for (int j = 0; j < n; j++) d[i][j] = Double.parseDouble(cells[j + 1]);
        }
        return new CityGraph(d);
    }

    private static List<String> readLines(Path csv) throws IOException {
        List<String> out = new ArrayList<>();
        for (String l : Files.readAllLines(csv, StandardCharsets.UTF_8)) {
            if (!l.trim().isEmpty()) out.add(l.replace("\uFEFF", ""));
        }
        return out;
    }
}
