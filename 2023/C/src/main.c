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
    printf("OUT: %d\n", runDay2(file2));

    exit(0);
}
