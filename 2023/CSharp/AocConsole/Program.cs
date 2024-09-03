using AocConsole;

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

Console.WriteLine("DAY 2 - Part 2");
Console.WriteLine("------------------------------------------------");
Console.WriteLine("Expect: 69629");
Console.WriteLine($"OUT: {Day2.Part2(day2Data)}");
Console.WriteLine();

Console.WriteLine("DAY 3 - Part 1");
Console.WriteLine("------------------------------------------------");
Console.WriteLine("Expect: 535078");
string day3Data = File.ReadAllText("data/day3.txt");
Console.WriteLine($"OUT: {Day3.Part1(day3Data)}");
Console.WriteLine();

Console.WriteLine("DAY 3 - Part 2");
Console.WriteLine("------------------------------------------------");
Console.WriteLine("Expect: 75312571");
Console.WriteLine($"OUT: {Day3.Part2(day3Data)}");
Console.WriteLine();