#include "../inc/Util.hpp"
#include <cctype>
#include <fstream>
#include <string>
#include <memory>
#include <vector>

std::unique_ptr<std::vector<std::string>> AoC::Util::getLines(std::ifstream &is) {
    auto lines = std::make_unique<std::vector<std::string>>();
    while (is.rdstate() == 0) {
        std::string str;
        std::getline(is, str);
        lines->push_back(str);
    }
    
    return lines;
}

int AoC::Util::getNumber(std::string const &str, int pos, int &out) {
    int n = pos;
    while (std::isdigit(str[n])) { ++n; }
    out = std::stoi(str.substr(pos, n - pos));
    return n;
}
