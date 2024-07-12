#include <stdlib.h>
#include <ctype.h>
#include <stdio.h>
#include <string.h>
#include "inc/days.h"

const int WIDTH = 141;
const int HEIGHT = 140;
const int SIZE = WIDTH * HEIGHT;

int isPart(const char *buf, int i, int digits, int line);
int isSymbol(const char c);

int runDay3(const char *file) {
  FILE *fp = fopen(file, "r");
  if (fp == NULL) {
    fprintf(stderr, "ERR: Can't open file '%s'\n", file);
    exit(EXIT_FAILURE);
  }

  char buf[SIZE];
  for (int i = 0; i < WIDTH; i++) {
    fread(&buf[i * WIDTH], 1, WIDTH, fp);
  }

  int out = 0;
  int line = 0;
  int digits = 0;
  int num = 0;
  for (int i = 0; i < SIZE; i++) {
    char c = buf[i];

    if (isdigit(c)) {
      num = (num * 10) + (c - '0');
      digits++;
    } else {
      if (digits > 0) {
        if (isPart(buf, i - digits, digits, line)) {
          printf("\e[1;32m%d\e[m", num);
          out += num;
        } else {
          printf("\e[1;m%d\e[m", num);
        }

        num = 0;
        digits = 0;
      }
      
      if (isSymbol(c)) {
        printf("\e[1;31m%c\e[m", c);
      } else {
        printf("%c", c);
      }
    }

    if (i == line + (WIDTH - 1)) {
      line += WIDTH;
    }
  }
  
  fclose(fp);
  return out;
}

int isPart(const char *buf, int i, int digits, int line) {
  int w = i - 1;
  if (w >= line && isSymbol(buf[w])) { return 1; }
  
  int e = i + digits;
  if (e < line + WIDTH && isSymbol(buf[e])) { return 1; }
  
  for (int j = -1; j < digits + 1; j++) {
    int adj = i + j;

    int n = adj - WIDTH;
    if (n > 0 && isSymbol(buf[n])) {return 1; }

    int s = adj + WIDTH;
    if (s < SIZE && isSymbol(buf[s])) { return 1; }
  }

  return 0;
}

int isSymbol(const char c) {
  if (isdigit(c) || c == '.' || c == '\n') { return 0; }
  return 1;
}
