#include <iostream>
#include <fstream>
#include "../inc/Day1.hpp"
#include "../inc/Day2.hpp"
#include "../inc/Day3.hpp"

int main(int argc, const char *argv[]) {
    std::cout << "Day1 - Part1" << '\n';
    std::cout << "------------------------------------------------------------" << '\n';
    std::cout << "Expecting: 55686" << '\n';
    std::ifstream day1_is("data/official_input_day1");
    if (!day1_is.is_open()) {
        std::cerr << "Error: Can't find day1 file." << '\n';
        return EXIT_FAILURE;
    }
    long day1_out = AoC::Day1::part1(day1_is);
    std::cout << "Out: " << day1_out << '\n';
    std::cout << '\n';
    
    std::cout << "Day2 - Part1" << '\n';
    std::cout << "------------------------------------------------------------" << '\n';
    std::cout << "Expecting: 2632" << '\n';
    std::ifstream day2_is("data/official_input_day2");
    if (!day2_is.is_open()) {
        std::cerr << "Error: Can't find day2 file." << '\n';
        return EXIT_FAILURE;
    }
    int day2_out = AoC::Day2::part1(day2_is, 12, 13, 14);
    std::cout << "Out: " << day2_out << '\n';
    std::cout << '\n';
 
    std::cout << "Day2 - Part2" << '\n';
    std::cout << "------------------------------------------------------------" << '\n';
    std::cout << "Expecting: 69629" << '\n';
    day2_is.clear();
    day2_is.seekg(std::ios::beg);
    int day2_part2_out = AoC::Day2::part2(day2_is);
    std::cout << "Out: " << day2_part2_out << '\n';
    std::cout << '\n';
    
    std::cout << "Day3 - Part1" << '\n';
    std::cout << "------------------------------------------------------------" << '\n';
    std::ifstream day3_is("data/official_input_day3");
    if (!day3_is.is_open()) {
        std::cerr << "Error: Can't find day3 file." << '\n';
        return EXIT_FAILURE;
    }
    std::cout << "Expecting: 535078" << '\n';
    int day3_part1_out = AoC::Day3::part1(day3_is);
    std::cout << "Out: " << day3_part1_out << '\n';
    std::cout << '\n';
    
    std::cout << "Day3 - Part2" << '\n';
    std::cout << "------------------------------------------------------------" << '\n';
    std::cout << "Expecting: ????" << '\n';
    day3_is.clear();
    day3_is.seekg(std::ios::beg);
    int day3_part2_out = AoC::Day3::part2(day3_is);
    std::cout << "Out: " << day3_part2_out << '\n';
    std::cout << '\n';
    
    return EXIT_SUCCESS;
}
