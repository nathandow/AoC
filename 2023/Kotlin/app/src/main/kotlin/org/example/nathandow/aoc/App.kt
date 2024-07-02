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
        val filename = "inputs/day1/official_input.txt"
        val day1 = Day1()
        val out = day1.run(filename)
        println("OUT: $out")
        println()
    }

    private fun runDay2() {
        println("Day 2 - Cube Conundrum")
        println("--------------------------------------------------------------------------------")
        val filename = "inputs/day2/official_input.txt"
        val day2 = Day2()

        println("PART 1")
        val out = day2.runPart1(filename, red = 12, green = 13, blue = 14)
        val outLambda = day2.runPart1Lambda(filename, red = 12, green = 13, blue = 14)
        println("OUT       : $out")
        println("OUT LAMBDA: $outLambda")
    }
}