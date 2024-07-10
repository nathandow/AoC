#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include <ctype.h>
#include <string.h>
#include "inc/util.h"

//int sumPlayableGames(FILE *fp, int maxR, int maxG, int maxB);
void parseLine(char *buf, int len, int *gameId, int *r, int *g, int *b);

int runDay2Part1(const char *file, int maxR, int maxG, int maxB) {
    FILE *fp = fopen(file, "r");
    if (fp == NULL) {
        fprintf(stderr, "ERR: Can't open file '%s'\n", file);
        exit(EXIT_FAILURE);
    }

    int sum = 0;
    char buf[256];
    while (fgets(buf, 256, fp) != NULL) {    
        int gameId = 0;
        int r = 0;
        int g = 0;
        int b = 0;

        parseLine(buf, 256, &gameId, &r, &g, &b);
        if (r <= maxR && g <= maxG && b <= maxB) {
            sum += gameId;
        }
    }

    fclose(fp);
    return sum;
}

int runDay2Part2(const char *file) {
    FILE *fp = fopen(file, "r");
    if (fp == NULL) {
        fprintf(stderr, "ERR: Can't open file '%s'\n", file);
        exit(EXIT_FAILURE);
    }

    int sum = 0;
    char buf[256];
    while (fgets(buf, 256, fp) != NULL) {    
        int gameId = 0;
        int r = 0;
        int g = 0;
        int b = 0;

        parseLine(buf, 256, &gameId, &r, &g, &b);
        sum += r * g * b;
    }

    fclose(fp);
    return sum;
}

void parseLine(char *buf, int len, int *gameId, int *r, int *g, int *b) {
    int num = 0;
    for (int i = 0; i < len; i++) {
        if (i == 0) {
            i += strlen("Game ");
            i += readNumber(&buf[i], gameId);
            i += strlen(": ");
        }

        if (isdigit(buf[i]) != 0) {
            i += readNumber(&buf[i], &num);
        } else {
            if (buf[i] == '\n' || buf[i] == '\0') { break; }
            else if (startsWith("red", &buf[i]) == 0) { *r = max(*r, num); }
            else if (startsWith("green", &buf[i]) == 0) { *g = max(*g, num); }
            else if (startsWith("blue", &buf[i]) == 0) { *b = max(*b, num); }
        }
    }
}

/*
int sumPlayableGames(FILE *fp, int maxR, int maxG, int maxB) {
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
*/