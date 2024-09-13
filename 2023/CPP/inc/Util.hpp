#ifndef Util_hpp
#define Util_hpp

#include <memory>
#include <vector>

namespace AoC {

class Util {
public:
    static std::unique_ptr<std::vector<std::string>> getLines(std::ifstream &is);
    static int getNumber(std::string const &str, int pos, int &out);
};

}


#endif /* Util_hpp */
