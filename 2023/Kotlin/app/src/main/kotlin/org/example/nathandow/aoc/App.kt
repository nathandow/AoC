package org.example.nathandow.aoc
const val NS_PER_MS = 1000000

fun main() {
    // Day1, Part1
    println("Day 1, Part 1 - Trebuchet ?!")
    var start = System.nanoTime()
    val d1p1Out = Day1.part1("app/data/official_input_day1")
    println("Expected: 55686")
    println("Actual: $d1p1Out")
    println("Elapsed: ${(System.nanoTime() - start) / NS_PER_MS} ms")
    println()

    // Day2, Part1
    println("Day 1, Part 1 - Trebuchet ?!")
    start = System.nanoTime()
    val d2p1Out = Day2.part1("app/data/official_input_day2", 12, 13, 14)
    println("Expected: 2632")
    println("Actual: $d2p1Out")
    println("Elapsed: ${(System.nanoTime() - start) / NS_PER_MS} ms")
    println()

    // Day2, Part2
    println("Day 2, Part 2 - Trebuchet ?!")
    start = System.nanoTime()
    val d2p2Out = Day2.part2("app/data/official_input_day2")
    println("Expected: 69629")
    println("Actual: $d2p2Out")
    println("Elapsed: ${(System.nanoTime() - start) / NS_PER_MS} ms")
    println()

    // Day3, Part1
    println("Day 3, Part 1 - Gear Ratios")
    start = System.nanoTime()
    val d3p1Out = Day3.part1("app/data/official_input_day3")
    println("Expected: 535078")
    println("Actual: $d3p1Out")
    println("Elapsed: ${(System.nanoTime() - start) / NS_PER_MS} ms")
    println()
}