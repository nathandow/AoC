using System.Net;
using NaterLib;
namespace AocConsole;

public class Day2
{
    public static int Part1(string data, int r, int g, int b)
    {
        int sum = 0;

        foreach (string line in data.Split('\n'))
        {
            if (line.Length == 0) { continue; }
            Console.WriteLine($"{line}");

            string[] splitLine = line.Split(": ");
            if (splitLine.Length < 2) { continue; }
            int gameId = int.Parse(splitLine[0].Split(' ')[1]);
            //Console.WriteLine($"\t{gameId}");

            string[] cubes = splitLine[1].Split([", ", "; "], StringSplitOptions.None);
            if (cubes.Length == 0) { continue; }

            int maxR = 0;
            int maxG = 0;
            int maxB = 0;
            foreach (string cube in cubes)
            {
                string[] splitCube = cube.Split(' ');
                if (splitCube.Length < 2) { continue; }
                int result;
                if (!int.TryParse(splitCube[0], out result)) { continue; }

                if (splitCube[1] == "red") { maxR = Math.Max(maxR, result); }
                if (splitCube[1] == "green") { maxG = Math.Max(maxG, result); }
                if (splitCube[1] == "blue") { maxB = Math.Max(maxB, result); }

                //Console.WriteLine($"\t{splitCube[1]}: {int.Parse(splitCube[0])}");
            }

            if (maxR <= r && maxG <= g && maxB <= b)
            {
                Console.WriteLine($"\tWIN: {maxR} {maxG} {maxB}");
                sum += gameId;
            }
        }

        return sum;
    }
}