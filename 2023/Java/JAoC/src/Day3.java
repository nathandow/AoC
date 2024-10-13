import java.nio.file.Path;
import java.util.List;

public class Day3 {
    public static int part1(String fileName) {
        int sum = 0;

        List<String> lines = null;
        try {
            lines = java.nio.file.Files.readAllLines(Path.of(fileName));
        } catch (Exception e) {
            System.err.printf("Error loading file: %s\n", e.getMessage());
            return -1;
        }

        for (int i = 0; i < lines.size(); ++i) {
            for (int j = 0; j < lines.get(i).length(); ++j) {
                if (Character.isDigit(lines.get(i).charAt(j))) {
                    int s = j;
                    int n = parseNumber(lines.get(i), j);
                    int e = j + Integer.toString(n).length() - 1;

                    if (isPart(lines, i, s, e)) { sum += n;}
                    j = e + 1;
                }
            }
        }

        return sum;
    }

    public static int part2(String fileName) {
        int sum = 0;

        List<String> lines = null;
        try {
            lines = java.nio.file.Files.readAllLines((Path.of(fileName)));
        } catch (Exception e) {
            System.err.printf("Error loading file: %s\n", e.getMessage());
            return -1;
        }

        for (int i = 0; i < lines.size(); ++i) {
            String line = lines.get(i);
            System.out.printf("%s : %-4d\n", line, i);

            for (int j = 0; j < lines.get(i).length(); ++j) {
                if (line.charAt(j) == '*') {
                    System.out.println(" ".repeat(j) + "^");
                }
            }
        }

        return sum;
    }

    private static int parseNumber(String str, int pos) {
        int n = pos;
        while (n < str.length() && Character.isDigit(str.charAt(n))) { ++n; }
        return Integer.parseInt(str.substring(pos, n));
    }

    private static boolean isSymbol(char c) {
        return c != '.' && !Character.isDigit(c);
    }

    private static boolean isPart(List<String> lines, int line, int start, int end) {
        // north
        if (line > 0) {
            int n = start;
            if (n > 0) { n = n - 1; }
            while (n < lines.get(line - 1).length() && n <= end + 1) {
                if (isSymbol(lines.get(line - 1).charAt(n))) { return true; }
                ++n;
            }
        }

        // south
        if (line < lines.size() - 1) {
            int n = start;
            if (n > 0) { n = n - 1; }
            while (n < lines.get(line + 1).length() && n <= end + 1) {
                if (isSymbol(lines.get(line + 1).charAt(n))) { return true; }
                ++n;
            }
        }

        // west & east
        if (start > 0 && isSymbol(lines.get(line).charAt(start - 1))) { return true; }
        if (end < lines.get(line).length() - 1 && isSymbol((lines.get(line).charAt(end + 1)))) { return true; }

        return false;
    }
}
