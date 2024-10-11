#ifndef Util_h
#define Util_h

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
      return AoC::cantor((int)pn.number, AoC::cantor((int)pn.start, (int)pn.end));
    }

};


class Util {
public:
    static std::unique_ptr<std::vector<std::string>> getLines(std::ifstream &is);
    static size_t getNumber(std::string const &str, size_t pos, int &out);
};

}

#endif /* Util_h */
