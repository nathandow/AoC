//
//  Day2.swift
//  AoC
//
//  Created by Nathaniel Downey on 7/11/24.
//

import Foundation

fileprivate struct Game {
    var id: Int
    var r: Int = 0
    var g: Int = 0
    var b: Int = 0
}

class Day2 {
    func runPart1(data: String, maxR: Int, maxG: Int, maxB: Int) -> Int {
        var out = 0
        let lines = data.split(separator: "\n")
        for line in lines {
            guard let game = parseLine(line: String(line)) else { continue }
            if (game.r <= maxR && game.g <= maxG && game.b <= maxB) {
                out += game.id
            }
        }
        
        return out
    }
    
    func runPart2(data: String) -> Int {
        var out = 0
        let lines = data.split(separator: "\n")
        for line in lines {
            guard let game = parseLine(line: String(line)) else { continue }
            out += (game.r * game.g * game.b)
        }
        
        return out
    }
    
    private func parseLine(line: String) -> Game? {
        let gameColorSplit = line.split(separator: ":")
        let gameText = gameColorSplit[0].split(separator: " ")[1]
        guard let id = Int(gameText) else { return nil }
        var game = Game(id: id)
        
        for colorText in gameColorSplit[1].components(separatedBy: CharacterSet(charactersIn: ";,")) {
            let trimmedColorText = colorText.trimmingCharacters(in: CharacterSet(charactersIn: " "))
            let valueColor = trimmedColorText.split(separator: " ")
            guard let num = Int(valueColor[0]) else { continue }
            switch valueColor[1] {
            case "red":
                game.r = max(game.r, num)
            case "green":
                game.g = max(game.g, num)
            case "blue":
                game.b = max(game.b, num)
            default:
                continue
            }
        }
        
        return game
    }
}
