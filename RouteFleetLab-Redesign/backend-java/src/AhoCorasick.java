import java.util.*;

public class AhoCorasick {
    static class Node {
        Map<Character, Integer> next = new HashMap<>();
        int fail = 0;
        List<Integer> output = new ArrayList<>();
    }

    private final List<Node> trie = new ArrayList<>();
    private final String[] patterns;

    public AhoCorasick(String[] patterns) {
        this.patterns = patterns;
        trie.add(new Node());
        for (int i = 0; i < patterns.length; i++) insert(patterns[i].toLowerCase(), i);
        buildFailureLinks();
    }

    private void insert(String pattern, int id) {
        int node = 0;
        for (char ch : pattern.toCharArray()) {
            if (!trie.get(node).next.containsKey(ch)) {
                trie.get(node).next.put(ch, trie.size());
                trie.add(new Node());
            }
            node = trie.get(node).next.get(ch);
        }
        trie.get(node).output.add(id);
    }

    private void buildFailureLinks() {
        Queue<Integer> queue = new ArrayDeque<>();
        for (int child : trie.get(0).next.values()) queue.add(child);

        while (!queue.isEmpty()) {
            int u = queue.poll();
            for (Map.Entry<Character, Integer> entry : trie.get(u).next.entrySet()) {
                char ch = entry.getKey();
                int v = entry.getValue();
                int f = trie.get(u).fail;
                while (f != 0 && !trie.get(f).next.containsKey(ch)) f = trie.get(f).fail;
                if (trie.get(f).next.containsKey(ch) && trie.get(f).next.get(ch) != v)
                    trie.get(v).fail = trie.get(f).next.get(ch);
                else
                    trie.get(v).fail = 0;
                trie.get(v).output.addAll(trie.get(trie.get(v).fail).output);
                queue.add(v);
            }
        }
    }

    public void search(String text) {
        text = text.toLowerCase();
        int node = 0;
        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            while (node != 0 && !trie.get(node).next.containsKey(ch)) node = trie.get(node).fail;
            if (trie.get(node).next.containsKey(ch)) node = trie.get(node).next.get(ch);
            else node = 0;

            for (int id : trie.get(node).output) {
                int start = i - patterns[id].length() + 1;
                System.out.println("Found: " + patterns[id] + " at index " + start);
            }
        }
    }

    public static void main(String[] args) {
        String[] cities = {"Hyderabad", "Warangal", "Vijayawada", "Guntur", "Tirupati"};
        String text = "We start in Hyderabad, visit Warangal and Vijayawada, then reach Guntur and Tirupati.";
        AhoCorasick ac = new AhoCorasick(cities);
        ac.search(text);
    }
}
