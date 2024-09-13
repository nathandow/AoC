#include "../inc/Day2.hpp"
#include "../inc/Util.hpp"

int AoC::Day2::part1(std::ifstream &is, int r, int g, int b) {
    int sum = 0;
    
    auto lines = AoC::Util::getLines(is);
    for (auto line : *lines) {
        if (line.length() <= 0) { continue; }
        
        int maxR = 0;
        int maxG = 0;
        int maxB = 0;
        
        int game_id = std::stoi(line.substr(5, line.find(":") - 5));
        int i = line.find(":");
        while (i < line.length()) {
            if (std::isdigit(line[i])) {
                int n;
                i = AoC::Util::getNumber(line, i, n) + 1;
                
                if (line.rfind("red", i) == i) {
                    maxR = std::max(maxR, n);
                } else if (line.rfind("green", i) == i) {
                    maxG = std::max(maxG, n);
                } else if (line.rfind("blue", i) == i) {
                    maxB = std::max(maxB, n);
                }
            } else {
                ++i;
            }
        }
        
        if (maxR <= r && maxG <= g && maxB <= b) {
            sum += game_id;
        }
    }
    
    return sum;
}

int AoC::Day2::part2(std::ifstream &is) {
    int sum = 0;
    
    auto lines = AoC::Util::getLines(is);
    for (auto line : *lines) {
        if (line.length() <= 0) { continue; }
        
        int maxR = 0;
        int maxG = 0;
        int maxB = 0;
        
        int i = line.find(":");
        while (i < line.length()) {
            if (std::isdigit(line[i])) {
                int n;
                i = AoC::Util::getNumber(line, i, n) + 1;
                
                if (line.rfind("red", i) == i) {
                    maxR = std::max(maxR, n);
                } else if (line.rfind("green", i) == i) {
                    maxG = std::max(maxG, n);
                } else if (line.rfind("blue", i) == i) {
                    maxB = std::max(maxB, n);
                }
            } else {
                ++i;
            }
        }

        sum += maxR * maxG * maxB;
    }
    
    return sum;
}
