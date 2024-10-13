import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

class Game {
    public Game(int id, int red, int green, int blue) {
        this.id = id;
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    int id;
    int red;
    int green;
    int blue;
}

public class Day2 {
    public static int part1(String fileName, int r, int g, int b) {
        int sum = 0;

        try {
            BufferedReader reader = new BufferedReader(new FileReader(fileName));
            List<Game> games = getMaxColorsFromGames(reader, r, g, b);
            for (Game game : games) {
                if (game.red <= r && game.green <= g && game.blue <= b) { sum += game.id; }
            }
        } catch (Exception e) {
            System.err.printf("Error loading file: %s\n", e.getMessage());
            return -1;
        }

        return sum;
    }

    public static int part2(String fileName) {
        int sum = 0;

        try {
            BufferedReader reader = new BufferedReader(new FileReader(fileName));
            List<Game> games = getMaxColorsFromGames(reader, 0, 0, 0);
            for (Game game : games) {
                sum += game.red * game.green * game.blue;
            }
        } catch (Exception e) {
            System.err.printf("Error loading file: %s\n", e.getMessage());
            return -1;
        }

        return sum;
    }

    private static List<Game> getMaxColorsFromGames(BufferedReader reader, int r, int g, int b) {
        List<Game> games = new ArrayList<>();

        try {
            while (reader.ready()) {
                String line = reader.readLine();

                String[] splitByLine = line.split(":");
                if (splitByLine.length != 2) { continue; }
                int gameId = Integer.parseInt(splitByLine[0].split(" ")[1]);
                Game game = new Game(gameId, r, g, b);

                String[] hands = splitByLine[1].split(";");
                if (hands.length == 0) { continue; }
                for (String hand : hands) {
                    String[] colors = hand.split(", ");
                    for (String color : colors) {
                        String[] c = color.trim().split(" ");
                        if (c.length != 2) { continue; }
                        switch (c[1]) {
                            case "red":
                                try { game.red = Math.max(game.red, Integer.parseInt(c[0])); }
                                catch (NumberFormatException re) { /* ignore */ }
                                break;

                            case "green":
                                try { game.green = Math.max(game.green, Integer.parseInt(c[0])); }
                                catch (NumberFormatException ge) { /* ignore */ }
                                break;

                            case "blue":
                                try { game.blue = Math.max(game.blue, Integer.parseInt(c[0])); }
                                catch (NumberFormatException be) { /* ignore */ }
                                break;
                        }
                    }
                }

                games.add(game);
            }
        } catch (Exception e) {
            System.err.printf("Error reading file: %s\n", e.getMessage());
        }

        return games;
    }
}