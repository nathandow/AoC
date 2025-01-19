package org.example.nathandow.aoc

import java.io.File
import kotlin.math.max

class Day3 {
    companion object {
        // ansi color codes
        val ansiRed = "\u001b[31m"
        val ansiGreen = "\u001b[32m"
        val ansiBlue = "\u001b[34m"
        val ansiReset = "\u001b[0m"

        fun part1(file: String): Int {
            var sum = 0

            val lines = File(file).bufferedReader().readLines()
            for (y in 0 until lines.size) {
                print("${"%3d".format(y)}: ")
                var pos = 0
                while (pos < lines[y].length) {
                    if (Character.isDigit(lines[y][pos])) {
                        val n = parseNumber(lines[y], pos)
                        val e = pos + Integer.toString(n).length - 1
                        // TODO: check if partnumber
                        print(n)
                        pos = e + 1
                        continue;
                    } else if (lines[y][pos] == '.') {
                        print(".")
                    } else {
                        print("$ansiGreen${lines[y][pos]}$ansiReset")
                    }

                    ++pos
                }
                println()
            }

            return sum
        }

        fun parseNumber(str: String, pos: Int): Int {
            var n = pos
            while (n < str.length && Character.isDigit(str[n])) ++n
            return Integer.parseInt(str.substring(pos, n))
        }
    }
}