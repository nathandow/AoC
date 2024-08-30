using AocConsole;
using NaterLib;

Console.WriteLine("DAY 1");
Console.WriteLine("------------------------------------------------");
Console.WriteLine("Expect: 55686");
string day1Data = File.ReadAllText("data/day1.txt");
Console.WriteLine($"OUT: {Day1.Part1(day1Data)}");
Console.WriteLine();

Console.WriteLine("DAY 2 - Part 1");
Console.WriteLine("------------------------------------------------");
Console.WriteLine("Expect: 2632");
string day2Data = File.ReadAllText("data/day2.txt");
Console.WriteLine($"OUT: {Day2.Part1(day2Data, 12, 13, 14)}");
Console.WriteLine();