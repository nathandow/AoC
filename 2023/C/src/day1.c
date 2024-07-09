#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include "inc/days.h"

int runDay1ByLine(FILE *fp);
int runDay1ByFile(FILE *fp);
int firstLast(const char *str);

int runDay1(const char *file) {
  FILE *fp = fopen(file, "r");
  if (fp == NULL) {
    fprintf(stderr, "ERR: Can't open file '%s'\n", file);
    exit(1);
  }

  int out = runDay1ByFile(fp);
  fseek(fp, 0, SEEK_SET);
  int out2 = runDay1ByLine(fp);

  printf("FILE: %d\n", out);
  printf("LINE: %d\n", out2);

  fclose(fp);
  return out;
}

int runDay1ByLine(FILE *fp) {
  int lines = 0;
  int out = 0;
  char buf[256];

  while(fgets(buf, 256, fp) != NULL) {
    int fl = firstLast(buf);
    //printf("%-4d [%2d]: %s", lines, fl, buf);
    lines++;
    out += fl;
  }

  return out;
}

int runDay1ByFile(FILE *fp) {
  int out = 0;
  int c = 0; 
  int s = 0;
  int e = 0;
  while ((c = fgetc(fp)) != EOF) {
    if (c == '\n') {
      if (s != 0 && e != 0) {
        //printf(" <-- %d\n", s * 10 + e);
        out += s * 10 + e;
        s = 0;
        e = 0;
      } else {
        //printf("\n");
      }
    } else if (isdigit(c)) {
      //printf("\e[1m%c\e[m", c);
      if (s == 0) { s = c - '0'; }
      e = c - '0';
    } else {
      //printf("%c", c);
    }
  }

  return out;
}

/*
 * returns an int from the first and last digit in the str.
 */
int firstLast(const char *str) {
  if (str == NULL) { return 0; }
  unsigned long len = strlen(str);
  if (len <= 0) { return 0;}
  len = strlen(str) - 1;

  int start = 0;
  int end = 0;
  for (int i = 0; i < len; i ++) {
    if (start != 0 && end != 0) { break; }
    if (start == 0 && isdigit(str[i]) != 0) { start = str[i] - '0'; }
    if (end == 0 && isdigit(str[len - (i + 1)]) != 0) { end = str[len - (i + 1)] - '0'; }
  }

  return (start * 10) + end;
}
