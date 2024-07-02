package org.example.nathandow.aoc

import java.io.File

class Day1 {
    /*
     * Note: This is valid for both part 1 & 2.
     */
    fun run(inputFile: String) : Int {
        val inputStream = File(inputFile).inputStream()
        return inputStream
            .bufferedReader()
            .readLines()
            .fold(0) { sum, line -> sum + firstLast(line) }
    }

    private fun firstLast(str: String) : Int {
        var s = 0
        var e = 0

        for (i in str.indices) {
            if (s == 0) { s = getDigit(str, i) }
            if (e == 0) { e = getDigit(str, str.length - (i + 1)) }

            if (s != 0 && e != 0) {
                return "$s$e".toInt()
            }
        }

        return 0
    }

    private fun getDigit(str: String, i: Int) : Int {
        return if (str[i].isDigit()) {
            str[i].digitToInt()
        } else {
            getAlphaDigit(str, i)
        }
    }

    private fun getAlphaDigit(str: String, i: Int) : Int {
        val englishToDigit = mapOf(
            "one" to 1,
            "two" to 2,
            "three" to 3,
            "four" to 4,
            "five" to 5,
            "six" to 6,
            "seven" to 7,
            "eight" to 8,
            "nine" to 9
        )

        for (k in englishToDigit.keys) {
            if (str.substring(i).startsWith(k)) {
                return englishToDigit[k] ?: 0
            }
        }

        return 0
    }
}