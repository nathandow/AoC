#include <stdio.h>
#include <stdlib.h>
#include "inc/days.h"

int main(int argc, char *argv[]) {
    printf("DAY 1\n");
    printf("--------------------------------------------------------------------------------\n");
    const char *file = "inputs/day1/official_input";
    printf("IN: %s\n", file);
    printf("OUT: %d\n", runDay1(file));

    printf("\nDAY 2\n");
    printf("--------------------------------------------------------------------------------\n");
    const char *file2 = "inputs/day2/official_input";
    printf("IN: %s\n", file2);
    printf("PART1 OUT: %d\n", runDay2Part1(file2, 12, 13, 14));
    printf("PART2 OUT: %d\n", runDay2Part2(file2));

    printf("\nDAY 3\n");
    printf("--------------------------------------------------------------------------------\n");
    const char *file3 = "inputs/day3/official_input";
    printf("IN: %s\n", file3);
    runDay3();

    exit(EXIT_SUCCESS);
}
