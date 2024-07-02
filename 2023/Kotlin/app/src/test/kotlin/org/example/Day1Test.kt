package org.example

import org.example.nathandow.aoc.Day1
import kotlin.test.Test
import kotlin.test.assertEquals

class Day1Test {
    @Test fun runValidInput() {
        val cut = Day1()
        assertEquals(142, cut.run("../inputs/day1/simple.txt"))
    }

    @Test fun runOfficialInput() {
        val cut = Day1()
        assertEquals(55686, cut.run("../inputs/day1/official_input.txt"))
    }

    @Test fun runNoDigits() {
        val cut = Day1()
        assertEquals(0, cut.run("../inputs/day1/no_digits.txt"))
    }

    @Test fun runSomeDigits_100() {
        val cut = Day1()
        assertEquals(100, cut.run("../inputs/day1/some_digits_100.txt"))
    }

    @Test fun runRepeats_111() {
        val cut = Day1()
        assertEquals(110, cut.run("../inputs/day1/repeats_110.txt"))
    }

    @Test fun runUniqueValues() {
        val cut = Day1()
        assertEquals(990, cut.run("../inputs/day1/unique_values.txt"))
    }
}