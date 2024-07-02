package org.example.nathandow.aoc

import java.io.File
import kotlin.math.max

class Game(val id: Int, var red: Int = 0, var green: Int = 0, var blue: Int = 0) {
}

class Day2 {
    fun runPart1(inputFile: String, red: Int, green: Int, blue: Int): Int {
        val games: MutableMap<Int, Game> = mutableMapOf()

        val reader = File(inputFile).bufferedReader()
        reader.forEachLine { line ->
            val splitGameHands = line.split(":")

            //id
            val id = splitGameHands.first().split(" ").last().toInt()
            val game = Game(id)

            // hands
            val trimmedHands = splitGameHands.last().trim()
            trimmedHands.split("; ").forEach { hand ->
                hand.split(", ").forEach { component ->
                    val amountPair = component.split(" ")
                    val amountVal = amountPair.first().toInt()

                    when (amountPair.last()) {
                        "red" -> game.red = max(amountVal, game.red)
                        "green" -> game.green = max(amountVal, game.green)
                        "blue" -> game.blue = max(amountVal, game.blue)
                    }
                }
            }

            games[game.id] = game
        }

        val possibleGames = games.values.filter { (it.red <= red && it.green <= green && it.blue <= blue) }
        val sum = possibleGames.fold(0) { sum, game -> sum + game.id }
        return sum
    }

    /*
     * As an exercise
     *  - lean more on map/reduce/filter.
     *  - list instead of map where id was redundant.
     * Possible improvements:
     *  - Stronger error checking:
     *      - Missing files
     *      - Verify data after splits
     *      - Verify number values are parsed to Int and bail
     *      - Do we just ignore lines that don't conform and bail?
     */
    fun runPart1Lambda(inputFile: String, red: Int, green: Int, blue: Int): Int {
        val games: MutableList<Game> = mutableListOf()

        val reader = File(inputFile).bufferedReader()
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

        val sum = games
            .filter { (it.red <= red && it.green <= green && it.blue <= blue) }
            .fold(0) { sum, game -> sum + game.id }
        return sum
    }
}