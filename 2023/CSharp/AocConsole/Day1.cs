using NaterLib;
namespace AocConsole;

public class Day1
{
    public static int Part1(string data)
    {
        int sum = 0;
        foreach (string line in data.Split('\n'))
        {
            int start = 0;
            int end = 0;
            for (int i = 0; i < line.Length; ++i)
            {
                if (start != 0 && end != 0) { break; }
                if (start == 0) { start = Common.ToDigit(line[i..]); }
                if (end == 0) { end = Common.ToDigit(line[^(i + 1)..]); }
            }
            
            sum += start * 10 + end;
        }

        return sum;
    }
}
