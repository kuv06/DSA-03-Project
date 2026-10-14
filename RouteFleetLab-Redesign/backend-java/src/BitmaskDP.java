import java.util.*;

public class BitmaskDP {
    static final int INF = 1_000_000_000;

    static class Result {
        int cost;
        List<Integer> path;
        Result(int cost, List<Integer> path) { this.cost = cost; this.path = path; }
    }

    static Result solve(int[][] dist) {
        int n = dist.length;
        int size = 1 << n;
        int[][] dp = new int[size][n];
        int[][] parent = new int[size][n];

        for (int[] row : dp) Arrays.fill(row, INF);
        for (int[] row : parent) Arrays.fill(row, -1);

        // City 0 is the fixed starting city.
        dp[1][0] = 0;

        for (int mask = 1; mask < size; mask++) {
            if ((mask & 1) == 0) continue;

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
        int last = -1;
        for (int i = 1; i < n; i++) {
            if (dp[fullMask][i] < bestCost) {
                bestCost = dp[fullMask][i];
                last = i;
            }
        }

        List<Integer> path = new ArrayList<>();
        int mask = fullMask;
        while (last != -1) {
            path.add(last);
            int previous = parent[mask][last];
            mask ^= (1 << last);
            last = previous;
        }
        Collections.reverse(path);
        return new Result(bestCost, path);
    }

    public static void main(String[] args) {
        int[][] dist = {
            {0, 10, 15, 20},
            {10, 0, 35, 25},
            {15, 35, 0, 30},
            {20, 25, 30, 0}
        };

        Result result = solve(dist);
        System.out.println("Minimum path cost = " + result.cost);
        System.out.println("Path = " + result.path);
    }
}
