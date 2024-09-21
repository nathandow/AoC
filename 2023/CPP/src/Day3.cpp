#include "../inc/Day3.hpp"
#include "../inc/Util.hpp"
#include <cctype>
#include <cstddef>
#include <fstream>
#include <iostream>
#include <numeric>
#include <string>
#include <unordered_set>

int AoC::Day3::part1(std::ifstream &is) {
  int sum = 0;

  auto lines = AoC::Util::getLines(is);
  for (int row = 0; row < lines->size(); ++row) {
    std::string line = lines->at(row);
    if (line.length() == 0) { continue; }
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

int AoC::Day3::part2(std::ifstream &is) {
  int sum = 0;

  auto lines = AoC::Util::getLines(is);
  for (int row = 0; row < lines->size(); ++row) {
    std::string const &line = lines->at(row);
    if (line.length() == 0) { continue; }
    //std::cout << std::setw(3) << row << ": " << line << "\n";
    for (int col = 0; col < line.length(); ++col) {
      size_t gearRatio = AoC::Day3::sumGearParts(lines, row, col);
      if (gearRatio != std::string::npos) {
        //std::cout << "\t" << gearRatio << "\n";
        sum += gearRatio; 
      }
    }
  }

  return sum;
}

size_t AoC::Day3::sumGearParts(std::unique_ptr<std::vector<std::string>> &lines, int row, int col) {
  if (lines->at(row)[col] != '*') { return std::string::npos; }
  std::unordered_set<AoC::PartNumber, AoC::PartNumberHash> parts;

  // N 
  if (row > 0) {
    if (col - 1 > 0) {
      PartNumber pn = AoC::Day3::getPartNumber(lines->at(row - 1), col - 1);
      if (pn.number != std::string::npos) {
        parts.insert(pn);
      }
    }

    if (col + 1 < lines->at(row).length() - 1) {
      PartNumber pn = AoC::Day3::getPartNumber(lines->at(row - 1), col + 1);
      if (pn.number != std::string::npos) {
        parts.insert(pn);
      }
    }
  }

  // W
  if (col - 1 > 0) {
    PartNumber pn = AoC::Day3::getPartNumber(lines->at(row), col - 1);
    if (pn.number != std::string::npos) {
      parts.insert(pn);
    }
  }

  // E
  if (col + 1 < lines->at(row).length() - 1) {
    PartNumber pn = AoC::Day3::getPartNumber(lines->at(row), col + 1);
    if (pn.number != std::string::npos) {
      parts.insert(pn);
    }
  }

  // S
  if (row < lines->size() - 1) {
     if (col - 1 > 0) {
      PartNumber pn = AoC::Day3::getPartNumber(lines->at(row + 1), col - 1);
      if (pn.number != std::string::npos) {
        parts.insert(pn);
      }
    }

    if (col + 1 < lines->at(row).length() - 1) {
      PartNumber pn = AoC::Day3::getPartNumber(lines->at(row + 1), col + 1);
      if (pn.number != std::string::npos) {
        parts.insert(pn);
      }
    }
  }

  if (parts.size() == 2) {
    return std::accumulate(parts.begin(), parts.end(), 1, [](int sum, const PartNumber &curr) { return sum * curr.number; });
  }

  return std::string::npos;
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

AoC::PartNumber AoC::Day3::getPartNumber(std::string const &line, size_t pos) {
  AoC::PartNumber pn = {.number = std::string::npos, .start = pos, .end = pos};
  if (line.length() == 0 || !std::isdigit(line[pos])) { return pn; }

  size_t i = pos;
  while (i >= 0 && std::isdigit(line[i])) { --i; }
  ++i;
  pn.start = i;

  while (i < line.length() && std::isdigit(line[i])) { ++i; }
  --i;
  pn.end = i;

  if (pn.start != std::string::npos && pn.end != std::string::npos) {
    pn.number = std::stoi(line.substr(pn.start, pn.end - pn.start + 1));
  }

  return pn;
}


