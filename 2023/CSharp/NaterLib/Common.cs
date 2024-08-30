using System.Collections.Immutable;
using Microsoft.VisualBasic;

namespace NaterLib;

public class Common
{
    private static readonly ImmutableDictionary<string, int> EnglishToDigit = new Dictionary<string, int>()
    {
        {"one", 1},
        {"two", 2},
        {"three", 3},
        {"four", 4},
        {"five", 5},
        {"six", 6},
        {"seven", 7},
        {"eight", 8},
        {"nine", 9}
    }.ToImmutableDictionary();

    public static int ToDigit(string str)
    {
        if (Char.IsAsciiDigit(str.First())) { return str.First() - '0'; }
        return EnglishToDigit.FirstOrDefault(kvp => str.StartsWith(kvp.Key)).Value;
    }
}


