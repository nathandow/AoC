package org.example

import org.example.nathandow.aoc.Day2
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFails
import kotlin.test.assertNotNull

class Day2Test {
    val officialInputFile = "../inputs/day2/official_input.txt"

    @Test fun runOfficialInputPart1() {
        val d = Day2()
        val outImp = d.runPart1(officialInputFile, 12, 13, 14)
        val outLambda = d.runPart1Lambda(officialInputFile, 12, 13, 14)
        println("IMP: $outImp, LAMB: $outLambda")
        assertEquals(outImp, outLambda, message = "imperative and lambdas styles don't match")
    }

    @Test fun runOfficialInputPart2() {
        val d = Day2()
        throw NotImplementedError()
    }
}