#ifndef Util_hpp
#define Util_hpp

#include <memory>
#include <vector>

namespace AoC {

int cantor(int a, int b);

typedef struct _PartNumber {
    size_t number;
    size_t start;
    size_t end;

    bool operator==(const _PartNumber &rhs) const {
      return this->number == rhs.number &&
            this->start == rhs.start &&
            this->end == rhs.end;
    }

    size_t operator+(const _PartNumber &rhs) const {
      return this->number + rhs.number;
    }
} PartNumber;

class PartNumberHash {
  public:
    size_t operator()(const PartNumber &pn) const {
      return AoC::cantor(pn.number, AoC::cantor(pn.start, pn.end));
    }

};


class Util {
public:
    static std::unique_ptr<std::vector<std::string>> getLines(std::ifstream &is);
    static int getNumber(std::string const &str, size_t pos, int &out);
};

}


#endif /* Util_hpp */
