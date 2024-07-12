SOURCES = $(wildcard src/*.c)

default: program

all: clean program

program: $(SOURCES)
	clang -std=c11 -Wall -g -I. $(SOURCES) -o program

release: $(SOURCES) 
	clang -std=c11 -O3 -I. $(SOURCES) -o program 

clean:
	rm -f program 
	rm -f program
	rm -rf program.dSYM

run: program
	./program
