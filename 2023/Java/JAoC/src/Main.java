public class Main {

    public static void main(String[] args) {
        if (args.length != 1) {
            System.err.println("Must specify a data directory");
            return;
        }

        final int NS_PER_MS = 1000000;
        long start = System.nanoTime();

        // Day1, Part1
        System.out.println("Day1, Part1: Trebuchet?!");
        start = System.nanoTime();
        int d1p1_out = Day1.part1(args[0] + "/official_input_day1");
        System.out.println("Expected: 55686");
        System.out.printf("Actual: %d\n", d1p1_out);
        System.out.printf("Elapsed: %dms\n", (System.nanoTime() - start) / NS_PER_MS);
        System.out.println();

        // Day2, Part1
        System.out.println("Day2, Part1: Cube Conundrum");
        start = System.nanoTime();
        int d2p1_out = Day2.part1(args[0] + "/official_input_day2", 12, 13, 14);
        System.out.println("Expected: 2632");
        System.out.printf("Actual: %d\n", d2p1_out);
        System.out.printf("Elapsed: %dms\n", (System.nanoTime() - start) / NS_PER_MS);
        System.out.println();

        // Day2, Part1
        System.out.println("Day2, Part2: Cube Conundrum");
        start = System.nanoTime();
        int d2p2_out = Day2.part2(args[0] + "/official_input_day2");
        System.out.println("Expected: 69629");
        System.out.printf("Actual: %d\n", d2p2_out);
        System.out.printf("Elapsed: %dms\n", (System.nanoTime() - start) / NS_PER_MS);
        System.out.println();

        // Day3, Part1
        System.out.println("Day3, Part1: Gear Ratios");
        start = System.nanoTime();
        int d3p1_out = Day3.part1(args[0] + "/official_input_day3");
        System.out.println("Expected: 535078");
        System.out.printf("Actual: %d\n", d3p1_out);
        System.out.printf("Elapsed: %dms\n", (System.nanoTime() - start) / NS_PER_MS);
        System.out.println();

        // Day3, Part2
        System.out.println("TODO: Day3, Part2: Gear Ratios");
        start = System.nanoTime();
        int d3p2_out = Day3.part2(args[0] + "/official_input_day3");
        System.out.println("Expected: 75312571");
        System.out.printf("Actual: %d\n", d3p2_out);
        System.out.printf("Elapsed: %dms\n", (System.nanoTime() - start) / NS_PER_MS);
        System.out.println();

        /*
Day4 - Part1
------------------------------------------------------------
Expecting: ???
Day4::part1 called
Out: 0
         */
    }
}