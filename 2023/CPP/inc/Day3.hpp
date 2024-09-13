#ifndef _DAY3_HPP_
#define _DAY3_HPP_

#include <fstream>
#include <string>

namespace AoC {
  class Day3 {
    public:
      static int part1(std::ifstream &is);
      static int part2(std::ifstream &is);
      static bool isPart(std::unique_ptr<std::vector<std::string>> &lines, int row, int start, int end);
      static bool isSymbol(char c);
  };
}

#endif // _DAY3_HPP_
