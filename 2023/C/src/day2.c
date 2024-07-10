#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include <ctype.h>
#include <string.h>
#include "inc/util.h"

int sumPossibleGames(FILE *fp, int maxR, int maxG, int maxB);


int runDay2(const char *file) {
    FILE *fp = fopen(file, "r");
    if (fp == NULL) {
        fprintf(stderr, "ERR: Can't open file '%s'\n", file);
        exit(EXIT_FAILURE);
    }

    int out = sumPossibleGames(fp, 12, 13, 14);
    
    fclose(fp);
    return out;
}

int sumPossibleGames(FILE *fp, int maxR, int maxG, int maxB) {
    int sum = 0;
    int lines = 0;
    char buf[256];

    while (fgets(buf, 256, fp) != NULL) {
        int gameId = 0;
        int num = 0;
        int r = 0;
        int g = 0;
        int b = 0;

        for (int i = 0; i < 256; i++) {
            if (i == 0) {
                i += strlen("Game ");
                i += readNumber(&buf[i], &gameId);
                i += strlen(": ");
            }

            if (isdigit(buf[i]) != 0) {
                i += readNumber(&buf[i], &num);
            } else {
                if (buf[i] == '\n' || buf[i] == '\0') { break; }
                else if (startsWith("red", &buf[i]) == 0) { r = max(r, num); }
                else if (startsWith("green", &buf[i]) == 0) { g = max(g, num); }
                else if (startsWith("blue", &buf[i]) == 0) { b = max(b, num); }
            }
        }
        
        if (r <= maxR && g <= maxG && b <= maxB) {
            sum += gameId;
        }

        lines++;
    }
    
    return sum;
}