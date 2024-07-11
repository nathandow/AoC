//
//  Day1.swift
//  AoC
//
//  Created by Nathaniel Downey on 7/11/24.
//

import Foundation

class Day1 {
    private let englishToDigit = ["one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9 ]
    
    func run(data: String) -> Int {
        var out = 0
        let lines = data.split(separator: "\n")
        for subLine in lines {
            let line = String(subLine)
            let firstLast = combineFirstLastDigits(str: line)
            out += firstLast
        }
        
        return out
    }
    
    private func combineFirstLastDigits(str: String) -> Int {
        var first = 0
        var last = 0
        
        for index in str.indices {
            if first != 0 { break }
            first = asDigit(str: str, index: index)
        }
        
        for index in str.indices.reversed() {
            if last != 0 { break }
            last = asDigit(str: str, index: index)
        }
        
        return (first * 10) + last
    }
    
    private func asDigit(str: String, index: String.Index) -> Int {
        if str[index].isNumber { return str[index].wholeNumberValue ?? 0 }
        return englishAsDigit(str: str, index: index)
    }
    
    private func englishAsDigit(str: String, index: String.Index) -> Int {
        for key in englishToDigit.keys {
            if str[index...].starts(with: key) {
                if let value = englishToDigit[key] {
                    return value
                }
            }
        }
        
        return 0
    }
}
