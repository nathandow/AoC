SOURCES = $(wildcard src/*.cpp)

default: program

all: clean program

program: $(SOURCES)
	clang++ -std=c++17 -Wall -lstdc++ -g -I. $(SOURCES) -o program

release: $(SOURCES)
	clang++ -std=c++17 -lstdc++ -O3 -I. $(SOURCES) -o program

clean:
	rm -f program
	rm -f program
	rm -rf program.dSYM

run: program
	./program
