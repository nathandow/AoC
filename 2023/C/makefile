default: program

all: clean program


program: src/main.c src/day1.c
	clang -std=c11 -O3 -I. src/day1.c src/main.c -o program 

debug: src/main.c src/day1.c
	clang -std=c11 -Wall -g -I. src/day1.c src/main.c -o program_d

clean:
	rm -f program 
	rm -f program_d
	rm -rf program_d.dSYM

run: program
	./program
