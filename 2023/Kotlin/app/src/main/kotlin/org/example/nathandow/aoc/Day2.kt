package org.example.nathandow.aoc

import java.io.File
import kotlin.math.max

class Game(val id: Int, var red: Int = 0, var green: Int = 0, var blue: Int = 0) {
}

class Day2 {
    fun runPart1(file: String, r: Int = 0, g: Int = 0, b: Int = 0): Int {
        val games = getMaxColorsPerGame(file, r, g, b)
        val possibleGames = games.filter { (it.red <= r && it.green <= g && it.blue <= b) }
        val sum = possibleGames.fold(0) { sum, game -> sum + game.id }
        return sum
    }

    fun runPart2(file: String, r: Int = 0, g: Int = 0, b: Int = 0): Int {
        val games = getMaxColorsPerGame(file)
        val sum = games.fold(0) { sum, game ->
            sum + (game.red * game.green * game.blue)
        }

        return sum
    }

    /*
     * Returns the max colors needed for each game.
     */
    private fun getMaxColorsPerGame(file: String, r: Int = 0, g: Int = 0, b:Int = 0): MutableList<Game> {
        val games: MutableList<Game> = mutableListOf()

        val reader = File(file).bufferedReader()
        reader.readLines().map { line ->
            val splitByColon = line.split(":")
            val game = Game(splitByColon.first().split(" ").last().toInt(), 0, 0, 0)

            splitByColon.last().split("; ").forEach { hand ->
                hand.split(", ").forEach { color ->
                    val ct = color.trim().split(" ")
                    when (ct.last()) {
                        "red" -> game.red = max(game.red, ct.first().toInt())
                        "green" -> game.green = max(game.green, ct.first().toInt())
                        "blue" -> game.blue = max(game.blue, ct.first().toInt())
                    }
                }
            }

            games.add(game)
        }

        return games
    }
}