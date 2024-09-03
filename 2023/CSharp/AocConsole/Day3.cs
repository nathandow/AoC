using NaterLib;
namespace AocConsole;

public class Day3
{
    internal struct PartNumber
    {
        public PartNumber(int number, int start, int end)
        {
            this.number = number;
            this.start = start;
            this.end = end;
        }

        internal int number;
        internal int start;
        internal int end;
    }

    private static PartNumber ExtractPartNumber(string str, int pos)
    {
        if (!char.IsAsciiDigit(str[pos])) { return new PartNumber(0, pos, pos); }

        int step = pos;
        while (char.IsAsciiDigit(str[step])) { ++step; }
        int end = --step;
        int num = 0;
        int multiplier = 1;

        while (step >= 0 && char.IsAsciiDigit(str[step]))
        {
            num += int.Parse(str.Substring(step, 1)) * multiplier;
            multiplier *= 10;
            --step;
        }

        int start = ++step;
        return new PartNumber(num, start, end);
    }

    private static bool IsSymbol(char c)
    {
        return c != '.' && c != '\r' && !char.IsAsciiDigit(c);
    }

    private static bool IsGear(char c)
    {
        return c == '*';
    }

    private static bool IsPart(string[] lines, int row, int start, int end)
    {
        for (int i = start; i <= end; ++i)
        {
            if (row > 0)
            {
                if (IsSymbol(lines[row - 1][i])) { return true; }
                if (i > 0 && IsSymbol(lines[row - 1][i - 1])) { return true; }
                if (i < lines.Length - 1 && IsSymbol(lines[row - 1][i + 1])) { return true; }
            }

            if (row < lines.Length - 1)
            {
                if (IsSymbol(lines[row + 1][i])) { return true; }
                if (i > 0 && IsSymbol(lines[row + 1][i - 1])) { return true; }
                if (i < lines[row + 1].Length - 1 && IsSymbol(lines[row + 1][i + 1])) { return true; }
            }

            if (i > 0 && IsSymbol(lines[row][i - 1])) { return true; }
            if (i < lines[row].Length - 1 && IsSymbol(lines[row][i + 1])) { return true; }
        }

        return false;
    }

    private static List<PartNumber> WalkNeighbours(string[] lines, int row, int col)
    {
        List<PartNumber> numbers = [];

        // north
        if (row - 1 >= 0)
        {
            if (col > 0)
            {
                PartNumber nw = ExtractPartNumber(lines[row - 1], col - 1);
                if (nw.number != 0 && !numbers.Contains(nw)) { numbers.Add(nw); }
            }

            PartNumber n = ExtractPartNumber(lines[row - 1], col);
            if (n.number != 0 && !numbers.Contains(n)) { numbers.Add(n); }

            if (col < lines[row - 1].Length)
            {
                PartNumber ne = ExtractPartNumber(lines[row - 1], col + 1);
                if (ne.number != 0 && !numbers.Contains(ne)) { numbers.Add(ne); }
            }
        }

        // east and west
        if (col > 0)
        {
            PartNumber w = ExtractPartNumber(lines[row], col - 1);
            if (w.number !=0 && !numbers.Contains(w)) { numbers.Add(w); }
        }

        if (col < lines[row + 1].Length)
        {
            PartNumber e = ExtractPartNumber(lines[row], col + 1);
            if (e.number != 0 && !numbers.Contains(e)) { numbers.Add(e); }
        }

        // south
        if (row + 1 < lines.Length)
        {
            if (col > 0)
            {
                PartNumber sw = ExtractPartNumber(lines[row + 1], col - 1);
                if (sw.number != 0 && !numbers.Contains(sw)) { numbers.Add(sw); }
            }

            PartNumber s = ExtractPartNumber(lines[row + 1], col);
            if (s.number != 0 && !numbers.Contains(s)) { numbers.Add(s); }

            if (col < lines[row + 1].Length)
            {
                PartNumber se = ExtractPartNumber(lines[row + 1], col + 1);
                if (se.number != 0 && !numbers.Contains(se)) { numbers.Add(se); }
            }
        }

        return numbers;
    }

    public static int Part1(string data)
    {
        int sum = 0;
        
        string[] lines = data.Split('\n');
        for (int l = 0; l < lines.Length; ++l)
        {
            string line = lines[l];
            for (int i = 0; i < line.Length; ++i)
            {
                if (char.IsAsciiDigit(line[i]))
                {
                    PartNumber pn = ExtractPartNumber(line, i);
                    if (IsPart(lines, l, pn.start, pn.end))
                    {
                        sum += pn.number;
                    }
                    
                    i = pn.end + 1;
                }
            }
        }

        return sum;
    }

    public static int Part2(string data)
    {
        int sum = 0;

        string[] lines = data.Split('\n');
        for (int l = 0; l < lines.Length; ++l)
        {
            string line = lines[l];
            //Console.WriteLine($"{l,4}: {line}");
            for (int i = 0; i < line.Length; ++i)
            {
                if (IsGear(lines[l][i]))
                {
                    List<PartNumber> numbers = WalkNeighbours(lines, l, i);
                    if (numbers.Count == 2)
                    {
                        //Console.WriteLine($"\t{numbers.First().number} {numbers.Last().number}");
                        sum += numbers.First().number * numbers.Last().number;
                    }
                }
            }
        }
        return sum;
    }
}
