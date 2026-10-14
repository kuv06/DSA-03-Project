import java.util.*;

public class SOSDP {
    static final int INF = 1_000_000_000;

    public static void main(String[] args) {
        // Weight of each customer city from the depot.
        int[] distanceFromDepot = {10, 20, 15, 25};
        int n = distanceFromDepot.length;
        int size = 1 << n;

        // SOS DP: sum of weights for every possible subset.
        int[] subsetCost = new int[size];
        for (int i = 0; i < n; i++) subsetCost[1 << i] = distanceFromDepot[i];

        for (int bit = 0; bit < n; bit++) {
            for (int mask = 0; mask < size; mask++) {
                if ((mask & (1 << bit)) != 0) {
                    subsetCost[mask] += subsetCost[mask ^ (1 << bit)];
                }
            }
        }

        // Partition all customers into exactly k non-empty groups.
        int k = 2;
        int[][] dp = new int[k + 1][size];
        int[][] choice = new int[k + 1][size];

        for (int[] row : dp) Arrays.fill(row, INF);
        for (int[] row : choice) Arrays.fill(row, -1);
        dp[0][0] = 0;

        for (int groups = 1; groups <= k; groups++) {
            for (int mask = 1; mask < size; mask++) {
                // s is one non-empty group selected from mask.
                for (int s = mask; s > 0; s = (s - 1) & mask) {
                    int previousMask = mask ^ s;
                    if (dp[groups - 1][previousMask] == INF) continue;

                    int newCost = dp[groups - 1][previousMask] + subsetCost[s];
                    if (newCost < dp[groups][mask]) {
                        dp[groups][mask] = newCost;
                        choice[groups][mask] = s;
                    }
                }
            }
        }

        int fullMask = size - 1;
        System.out.println("Minimum partition cost = " + dp[k][fullMask]);

        // Reconstruct the groups.
        int mask = fullMask;
        for (int group = k; group >= 1; group--) {
            int selected = choice[group][mask];
            System.out.println("Group " + group + " mask = " + selected);
            mask ^= selected;
        }
    }
}
