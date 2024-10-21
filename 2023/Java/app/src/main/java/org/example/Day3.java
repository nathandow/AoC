package org.example;

import java.util.ArrayList;
import java.nio.file.Path;
import java.util.List;

public class Day3 {
    private static class PositionalNumber {
        int start;
        int end;
        int number;

        static PositionalNumber extract(String str, int pos) {
            if (str == null || str.isEmpty() || pos < 0 || pos >= str.length() || !Character.isDigit(str.charAt(pos))) {
                return null;
            }

            int start = pos;
            while (start > -1 && Character.isDigit(str.charAt(start))) { --start; }
            ++start;

            int end = start;
            while (end < str.length() && Character.isDigit(str.charAt(end))) { ++end; } 

            if (end - start == 0) { 
                return null; }

            PositionalNumber pn = new PositionalNumber();
            pn.start = start;
            pn.end = end;
            pn.number = Integer.parseInt(str.substring(start, end));
            return pn;
        }

        static boolean containsMember(List<PositionalNumber> numbers, PositionalNumber number) {
            if (number == null) { return false; }
            for (PositionalNumber n : numbers) {
                if (number.start == n.start && n.end == number.end && n.number == number.number) { return true; }
            }

            return false;
        }
    }

    public static int part1(String fileName) {
        int sum = 0;
        
        List<String> lines = null;
        try {
            lines = java.nio.file.Files.readAllLines(Path.of(fileName));
        } catch (Exception e) {
            System.err.printf("Error loading file: %s\n", e.getMessage());
            return -1;
        }

        for (int y = 0; y < lines.size(); ++y) {
            for (int x = 0; x < lines.get(y).length(); ++x) {
                if (Character.isDigit(lines.get(y).charAt(x))) {
                    int s = x;
                    int n = parseNumber(lines.get(y), x);
                    int e = x + Integer.toString(n).length() - 1;

                    if (isPart(lines, y, s, e)) { sum += n;}
                    x = e + 1;
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

        for (int y = 0; y < lines.size(); ++y) {
            String line = lines.get(y);
 //           System.out.printf("%s : %-4d\n", line, y);

            for (int x = 0; x < line.length(); ++x) {
                if (line.charAt(x) == '*') {
                    List<PositionalNumber> adjacentNumbers = getAdjacentUniqueNumbers(lines, y, x);
                    if (adjacentNumbers.size() == 2) { sum += adjacentNumbers.getFirst().number * adjacentNumbers.getLast().number; }
                }
            }
        }

        return sum;
    }

    /* TODO: Remove this tedium
     * We have to do lot's of bounds checks head for all 8 adjacent positions.
     * Can't we just just catch and ignore any out of bounds exception that might occur instead?
     */
    private static List<PositionalNumber> getAdjacentUniqueNumbers(List<String> lines, int gearY, int gearX) {
        List<PositionalNumber> numbers = new ArrayList<>();
        if (lines.size() == 0 || gearY < 0  || gearX < 0 || gearY >= lines.size()) { return numbers; }

        if (gearY > 0) {
            if (gearX > 0) {
                PositionalNumber nw = PositionalNumber.extract(lines.get(gearY - 1), gearX - 1);
                if (nw != null && !PositionalNumber.containsMember(numbers, nw)) { numbers.add(nw); }
            }

            if (gearX < lines.get(gearY).length() - 1) {
                PositionalNumber sw = PositionalNumber.extract(lines.get(gearY - 1), gearX + 1);
                if (sw != null && !PositionalNumber.containsMember(numbers, sw)) { numbers.add(sw); }
            }
        }

        if (gearX > 0) {
            PositionalNumber w = PositionalNumber.extract(lines.get(gearY), gearX - 1);
            if (w != null && !PositionalNumber.containsMember(numbers, w)) { numbers.add(w); }
        }

        if (gearX < lines.get(gearY).length() - 1) {
            PositionalNumber e = PositionalNumber.extract(lines.get(gearY), gearX + 1);
            if (e != null && !PositionalNumber.containsMember(numbers, e)) { numbers.add(e); }
        }

        if (gearY < (lines.size() - 1)) {
            if (gearX > 0) {
                PositionalNumber sw = PositionalNumber.extract(lines.get(gearY + 1), gearX - 1);
                if (sw != null && !PositionalNumber.containsMember(numbers, sw)) { numbers.add(sw); }
            }

            if (gearX < lines.get(gearY).length() - 1) {
                PositionalNumber se = PositionalNumber.extract(lines.get(gearY + 1), gearX + 1);
                if (se != null && !PositionalNumber.containsMember(numbers, se)) { numbers.add(se); }
            }
        }

        return numbers;
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
