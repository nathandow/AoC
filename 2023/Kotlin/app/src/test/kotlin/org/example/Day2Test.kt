package org.example

import org.example.nathandow.aoc.Day2
import kotlin.test.Test
import kotlin.test.assertEquals

class Day2Test {
    private val officialInputFile = "../inputs/day2/official_input.txt"

    @Test fun runOfficialInputPart1() {
        val d = Day2()
        val out = d.runPart1(officialInputFile, 12, 13, 14)
        assertEquals(2632, out)
    }

    @Test fun runOfficialInputPart2() {
        val d = Day2()
        val out = d.runPart2(officialInputFile)
        assertEquals(69629, out)
    }
}