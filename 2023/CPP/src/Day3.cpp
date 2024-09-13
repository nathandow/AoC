#include "../inc/Day3.hpp"
#include "../inc/Util.hpp"
#include <cctype>
#include <fstream>
#include <iostream>
#include <string>

int AoC::Day3::part1(std::ifstream &is) {
  int sum = 0;

  auto lines = AoC::Util::getLines(is);
  for (int row = 0; row < lines->size(); ++row) {
    if (lines->at(row).length() == 0) { continue; }

    auto line = lines->at(row);
    for (int col = 0; col < lines->at(row).length(); ++col) {
      if (std::isdigit(line[col])) {
        int n;
        int pos = AoC::Util::getNumber(line, col, n);
        bool isPart = AoC::Day3::isPart(lines, row, col, pos - 1);
        if (isPart) {
          sum += n;
        }

        col = pos;
      }
    }
  }

  return sum;
}

bool AoC::Day3::isPart(std::unique_ptr<std::vector<std::string>> &lines, int row, int start, int end) {
  for (int i = start; i <= end; ++i) {
    if (row > 0) {
      std::string const &prev_row = lines->at(row - 1);
      if (i - 1 >= 0 && isSymbol(prev_row[i - 1])) { return true; }
      if (isSymbol(prev_row[i])) { return true; }
      if (i + 1 < prev_row.length() && isSymbol(prev_row[i + 1])) { return true; }
    }

    if (row < lines->size()) {
      std::string const &next_row = lines->at(row + 1);
      if (i - 1 >= 0 && isSymbol(next_row[i - 1])) { return true; }
      if (isSymbol(next_row[i])) { return true; }
      if (next_row.length() > 0 && i + 1 < next_row.length() && isSymbol(next_row[i + 1])) { return true; }
    }
  }

  if (start > 0 && isSymbol(lines->at(row)[start - 1])) { return true; }
  if (end + 1 < lines->at(row).length() && isSymbol(lines->at(row)[end + 1])) { return true; }

  return false;
}

bool AoC::Day3::isSymbol(char c) {
  return c != '.' && c > 0 && !std::isdigit(c);
}
