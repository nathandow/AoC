default: program

all: clean program

program: src/main.c src/day1.c
	clang -std=c11 -Wall -g -I. src/day1.c src/main.c -o program

clean:
	rm -f program
	rm -rf program.dSYM

run: program
	./program
