import java.nio.file.Path;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        Path csv = Path.of(args.length > 0 ? args[0] : "data/distances.csv");
        List<City> cities = DataLoader.loadCities(csv);
        CityGraph graph = DataLoader.loadGraph(csv);
        System.out.println("RouteFleetLab Java backend");
        System.out.println("Algorithms: Aho-Corasick, Bitmask DP, TSP, Min-Cost Max-Flow, SOS DP");
        System.out.println("Loaded " + cities.size() + " cities from " + csv);
        System.out.println(cities.get(0).getName() + " -> " + cities.get(1).getName() + ": " + graph.getDistance(0, 1) + " km");
    }
}
