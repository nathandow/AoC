package org.example.nathandow.aoc

fun main() {
    val app = App()
    println("${app.greeting}\n")
    app.runAll()
}

class App {
    val greeting = "Advent of Code 2023"

    fun runAll() {
        runDay1()
        runDay2()
    }

    private fun runDay1() {
        println("Day 1 - Trebuchet ?!")
        println("--------------------------------------------------------------------------------")
        val file = "inputs/day1/official_input.txt"
        val day1 = Day1()
        val out = day1.run(file)
        println("OUT: $out")
        println()
    }

    private fun runDay2() {
        println("Day 2 - Cube Conundrum")
        println("--------------------------------------------------------------------------------")
        val file  = "inputs/day2/official_input.txt"
        val day2 = Day2()

        println("PART 1")
        val out = day2.runPart1(file, r = 12, g = 13, b = 14)
        println("OUT: $out")

        println("PART 2")
        val out2 = day2.runPart2(file)
        println("OUT2: $out2")
    }
}