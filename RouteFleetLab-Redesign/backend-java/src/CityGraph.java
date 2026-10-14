public class CityGraph {
    private final double[][] distances;
    public CityGraph(double[][] distances) { this.distances = distances; }
    public double getDistance(int from, int to) { return distances[from][to]; }
    public int size() { return distances.length; }
}
