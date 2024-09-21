#ifndef Day1_hpp
#define Day1_hpp

#include <string>
#include <unordered_map>

namespace AoC {

class Day1 {
public:
    static long part1(std::ifstream &is);
    static long getAsNumber(std::string const &str, int i);
    inline static const std::unordered_map<std::string, int> englishToNumber =
    {
        {"one", 1},
        {"two", 2},
        {"three", 3},
        {"four", 4},
        {"five", 5},
        {"six", 6},
        {"seven", 7},
        {"eight", 8},
        {"nine", 9}
    };
};

}

#endif /* Day1_hpp */
