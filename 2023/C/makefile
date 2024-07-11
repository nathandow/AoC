default: program

all: clean program

program: src/main.c src/day1.c src/day2.c src/day3.c src/util.c
	clang -std=c11 -Wall -g -I. src/day1.c src/day2.c src/day3.c src/main.c src/util.c -o program

release: src/main.c src/day1.c src/day2.c src/day3.c src/util.c
	clang -std=c11 -O3 -I. src/day1.c src/day2.c src/day3.c src/util.c src/main.c -o program 

clean:
	rm -f program 
	rm -f program
	rm -rf program.dSYM

run: program
	./program
