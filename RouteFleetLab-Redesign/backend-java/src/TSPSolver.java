public class TSPSolver {
    public static int solve(int[][] distance) {
        int n = distance.length;
        int size = 1 << n;
        int INF = Integer.MAX_VALUE / 4;
        int[][] dp = new int[size][n];
        for (int mask = 0; mask < size; mask++) java.util.Arrays.fill(dp[mask], INF);
        dp[1][0] = 0;
        for (int mask = 1; mask < size; mask++) {
            if ((mask & 1) == 0) continue;
            for (int u = 0; u < n; u++) {
                if (dp[mask][u] == INF || (mask & (1 << u)) == 0) continue;
                for (int v = 0; v < n; v++) {
                    if ((mask & (1 << v)) != 0) continue;
                    int next = mask | (1 << v);
                    dp[next][v] = Math.min(dp[next][v], dp[mask][u] + distance[u][v]);
                }
            }
        }
        int full = size - 1, ans = INF;
        for (int u = 1; u < n; u++) ans = Math.min(ans, dp[full][u] + distance[u][0]);
        return ans;
    }
}
