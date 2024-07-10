#include <string.h>
#include <ctype.h>
#include "inc/util.h"

int startsWith(const char *pre, const char *str) {
  return strncmp(pre, str, strlen(pre));
}

int max(int lhs, int rhs) {
    return lhs > rhs ? lhs : rhs;
}

int readNumber(const char *buf, int *num) {
    int cur = 0;
    int i = 0;
    while (isdigit(buf[i]) != 0) {
        cur = (cur * 10) + buf[i] - '0';
        i++;
    }

    *num = cur;
    return i;
}