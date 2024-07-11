//
//  main.swift
//  AoC
//
//  Created by Nathaniel Downey on 7/11/24.
//

import Foundation

runDay1()
runDay2()

func runDay1() {
    let file = "./inputs/day1/official_input"
    let data = loadData(file: file)
    print("DAY 1 - Trebuchet ?!")
    print("--------------------------------------------------------------------------------")
    print("INPUT: \(file)")

    let day = Day1()
    let out = day.run(data: data)
    print("  EXP: 55686")
    print("  OUT: \(out)")
    print()
}

func runDay2() {
    let file = "./inputs/day2/official_input"
    let data = loadData(file: file)
    print("DAY 2 - Cube Conundrum ")
    print("--------------------------------------------------------------------------------")
    print("INPUT: \(file)")
    let day = Day2()
    
    print("PART 1")
    let outPart1 = day.runPart1(data: data, maxR: 12, maxG: 13, maxB: 14)
    print("  EXP: 2632")
    print("  OUT: \(outPart1)")
    
    print("PART 2")
    let outPart2 = day.runPart2(data: data)
    print("  EXP: 69629")
    print("  OUT: \(outPart2)")
    print()
}

func loadData(file: String) -> String {
    var data: Data?
    do {
        let fileHandle = try FileHandle(forReadingFrom: URL(filePath: file))
        data = try fileHandle.readToEnd()
    } catch {
        switch error {
        default:
            print("ERR: \(error.localizedDescription)")
            exit(EXIT_FAILURE)
        }
    }

    guard let data = data else {
        print("Couldn't read file")
        exit(EXIT_FAILURE)
    }

    return String(decoding: data, as: UTF8.self)
}
