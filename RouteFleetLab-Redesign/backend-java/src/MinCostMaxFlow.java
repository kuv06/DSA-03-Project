import java.util.*;

public class MinCostMaxFlow {
    static class Edge {
        int to, reverse, capacity, cost;
        Edge(int to, int reverse, int capacity, int cost) {
            this.to = to;
            this.reverse = reverse;
            this.capacity = capacity;
            this.cost = cost;
        }
    }

    static class Result {
        int flow, cost;
        Result(int flow, int cost) { this.flow = flow; this.cost = cost; }
    }

    static List<Edge>[] graph;

    static void addEdge(int from, int to, int capacity, int cost) {
        Edge forward = new Edge(to, graph[to].size(), capacity, cost);
        Edge reverse = new Edge(from, graph[from].size(), 0, -cost);
        graph[from].add(forward);
        graph[to].add(reverse);
    }

    static Result minCostMaxFlow(int source, int sink) {
        int n = graph.length;
        int totalFlow = 0;
        int totalCost = 0;
        final int INF = 1_000_000_000;

        while (true) {
            int[] dist = new int[n];
            int[] parentNode = new int[n];
            int[] parentEdge = new int[n];
            boolean[] inQueue = new boolean[n];
            Arrays.fill(dist, INF);
            Arrays.fill(parentNode, -1);
            Arrays.fill(parentEdge, -1);

            Queue<Integer> queue = new ArrayDeque<>();
            dist[source] = 0;
            queue.add(source);
            inQueue[source] = true;

            // SPFA: shortest path in the residual graph.
            while (!queue.isEmpty()) {
                int u = queue.poll();
                inQueue[u] = false;

                for (int i = 0; i < graph[u].size(); i++) {
                    Edge e = graph[u].get(i);
                    if (e.capacity <= 0) continue;

                    if (dist[e.to] > dist[u] + e.cost) {
                        dist[e.to] = dist[u] + e.cost;
                        parentNode[e.to] = u;
                        parentEdge[e.to] = i;
                        if (!inQueue[e.to]) {
                            queue.add(e.to);
                            inQueue[e.to] = true;
                        }
                    }
                }
            }

            if (parentNode[sink] == -1) break;

            int push = INF;
            int v = sink;
            while (v != source) {
                int u = parentNode[v];
                Edge e = graph[u].get(parentEdge[v]);
                push = Math.min(push, e.capacity);
                v = u;
            }

            v = sink;
            while (v != source) {
                int u = parentNode[v];
                Edge e = graph[u].get(parentEdge[v]);
                e.capacity -= push;
                graph[v].get(e.reverse).capacity += push;
                v = u;
            }

            totalFlow += push;
            totalCost += push * dist[sink];
        }

        return new Result(totalFlow, totalCost);
    }

    public static void main(String[] args) {
        // 0 = source, 1/2 = intermediate cities, 3 = sink
        graph = new ArrayList[4];
        for (int i = 0; i < graph.length; i++) graph[i] = new ArrayList<>();

        addEdge(0, 1, 1, 2);
        addEdge(0, 2, 1, 4);
        addEdge(1, 2, 1, 1);
        addEdge(1, 3, 1, 3);
        addEdge(2, 3, 1, 1);

        Result result = minCostMaxFlow(0, 3);
        System.out.println("Maximum flow = " + result.flow);
        System.out.println("Minimum cost = " + result.cost);
    }
}
