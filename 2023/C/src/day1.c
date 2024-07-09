#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include "inc/days.h"

int parseByLine(FILE *fp);
int firstLast(const char *str);
int getDigit(const char *str);
int textToDigit(const char *buf);
int startsWith(const char *pre, const char *str);

int runDay1(const char *file) {
  FILE *fp = fopen(file, "r");
  if (fp == NULL) {
    fprintf(stderr, "ERR: Can't open file '%s'\n", file);
    exit(1);
  }

  int out = parseByLine(fp);

  fclose(fp);
  return out;
}

int parseByLine(FILE *fp) {
  //int lines = 0;
  int out = 0;
  char buf[256];

  while (fgets(buf, 256, fp) != NULL) {
    int fl = firstLast(buf);
    out += fl;
    //printf("%4d: [%2d] %s", lines, fl, buf);
    //lines++;
  }

  return out;
}

int firstLast(const char *str) {
  if (str == NULL) { return 0; }
  unsigned long len = strlen(str);
  if (len <= 0) { return 0;}
  len = strlen(str) - 1;
  int s = 0;
  int e = 0;

  for (int i = 0; i < len; i++) {
    if (s != 0 && e != 0) { break; }
    if (s == 0) { s = getDigit(&str[i]); }
    if (e == 0) { e = getDigit(&str[len - (i + 1)]); }
  }

  return (s * 10) + e;
}

int getDigit(const char *str) {
  if (isdigit(str[0]) != 0) {
    return str[0] - '0';
  } 

  return textToDigit(str);
}

int textToDigit(const char *buf) {
  if (startsWith("one", buf) == 0) { return 1; }
  if (startsWith("two", buf) == 0) { return 2; }
  if (startsWith("three", buf) == 0) { return 3; }
  if (startsWith("four", buf) == 0) { return 4; }
  if (startsWith("five", buf) == 0) { return 5; }
  if (startsWith("six", buf) == 0) { return 6; }
  if (startsWith("seven", buf) == 0) { return 7; }
  if (startsWith("eight", buf) == 0) { return 8; }
  if (startsWith("nine", buf) == 0) { return 9; }
  return 0;
}

int startsWith(const char *pre, const char *str) {
  return strncmp(pre, str, strlen(pre));
}
