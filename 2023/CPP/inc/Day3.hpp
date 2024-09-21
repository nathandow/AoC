#ifndef _DAY3_HPP_
#define _DAY3_HPP_

#include "../inc/Util.hpp"
#include <cstddef>
#include <fstream>
#include <memory>
#include <string>
#include <vector>

namespace AoC {
  class Day3 {
    public:
      static int part1(std::ifstream &is);
      static int part2(std::ifstream &is);
      static bool isPart(std::unique_ptr<std::vector<std::string>> &lines, int row, int start, int end);
      static size_t sumGearParts(std::unique_ptr<std::vector<std::string>> &lines, int row, int col);
      static bool isSymbol(char c);
      static PartNumber getPartNumber(std::string const &line, size_t pos);
  };
}

#endif // _DAY3_HPP_
