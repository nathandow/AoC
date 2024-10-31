#include <cctype>
#include <iostream>
#include <fstream>
#include <string>
#include "../inc/Util.hpp"
#include "../inc/Day1.hpp"

long AoC::Day1::part1(std::ifstream &is) {
    long sum = 0;
    auto lines = AoC::Util::getLines(is);
    int curr_line = 0;
    for (auto line : *lines) {
        //std::cout << std::setw(4) << curr_line << ": " << line << '\n';
        long first = -1;
        long last = -1;
        for (int i = 0; i < line.length(); ++i) {
            if (first == -1) { first = getAsNumber(line, i); }
            if (last == -1) { last = getAsNumber(line, (int)line.length() - (i + 1)); }
            
            if (first > -1 && last > -1) {
                sum += (first * 10) + last;
                break;
            }
        }
        ++curr_line;
    }
    
    return sum;
}

long AoC::Day1::getAsNumber(std::string const &str, int i) {
    if (isdigit(str[i])) { return str[i] - '0'; }
    
    for (auto kv : Day1::englishToNumber) {
        if (str.substr(i, kv.first.length()) == kv.first) { return kv.second;}
    }
    
    return -1;
}
