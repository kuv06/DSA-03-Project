import java.util.*;

public class TSP {
    static final int INF = 1_000_000_000;

    public static void main(String[] args) {
        int[][] dist = {
            {0, 10, 15, 20},
            {10, 0, 35, 25},
            {15, 35, 0, 30},
            {20, 25, 30, 0}
        };

        int n = dist.length;
        int size = 1 << n;
        int[][] dp = new int[size][n];
        int[][] parent = new int[size][n];

        for (int[] row : dp) Arrays.fill(row, INF);
        for (int[] row : parent) Arrays.fill(row, -1);

        dp[1][0] = 0;

        for (int mask = 1; mask < size; mask++) {
            for (int current = 0; current < n; current++) {
                if ((mask & (1 << current)) == 0 || dp[mask][current] == INF) continue;

                for (int next = 0; next < n; next++) {
                    if ((mask & (1 << next)) != 0) continue;
                    int newMask = mask | (1 << next);
                    int newCost = dp[mask][current] + dist[current][next];
                    if (newCost < dp[newMask][next]) {
                        dp[newMask][next] = newCost;
                        parent[newMask][next] = current;
                    }
                }
            }
        }

        int fullMask = size - 1;
        int bestCost = INF;
        int lastCity = -1;

        // Close the tour by returning from lastCity to city 0.
        for (int last = 1; last < n; last++) {
            int tourCost = dp[fullMask][last] + dist[last][0];
            if (tourCost < bestCost) {
                bestCost = tourCost;
                lastCity = last;
            }
        }

        List<Integer> path = new ArrayList<>();
        int mask = fullMask;
        int current = lastCity;
        while (current != -1) {
            path.add(current);
            int previous = parent[mask][current];
            mask ^= (1 << current);
            current = previous;
        }
        Collections.reverse(path);
        path.add(0); // return to starting city

        System.out.println("Minimum TSP tour cost = " + bestCost);
        System.out.println("Tour = " + path);
    }
}
