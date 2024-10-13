import java.io.BufferedReader;
import java.io.FileReader;
import java.util.Map;
import static java.util.Map.entry;

public class Day1 {
    private static final Map<String, Integer> englishToInteger = Map.ofEntries(
            entry("one", 1),
            entry("two", 2),
            entry("three", 3),
            entry("four", 4),
            entry("five", 5),
            entry("six", 6),
            entry("seven", 7),
            entry("eight", 8),
            entry("nine", 9));

    static int part1(String fileName) {
        int sum = 0;

        try {
            BufferedReader reader = new BufferedReader(new FileReader(fileName));
            while (reader.ready()) {
                String line = reader.readLine();
                int n = combineFirstLastDigits(line);
                if (n > -1) { sum += n; }
            }
        } catch (Exception e) {
            System.err.printf("Error loading file: %s\n", e.getMessage());
            return -1;
        }

        return sum;
    }

    private static int combineFirstLastDigits(String str) {
        int first = -1;
        int last = -1;

        for (int i = 0; i < str.length(); ++i) {
            if (first < 0) { first = getAsDigit(str, i); }
            if (last < 0) { last = getAsDigit(str, str.length() - i - 1); }
            if (first > -1 && last > -1) { return first * 10 + last; }
        }

        return -1;
    }

    private static int getAsDigit(String str, int index) {
        if (Character.isDigit(str.charAt(index))) { return str.charAt(index) - '0'; }

        for(String key : englishToInteger.keySet()) {
            if (str.startsWith(key, index)) { return englishToInteger.get(key); }
        }

        return -1;
    }
}
