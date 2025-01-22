var AocJS = {
  // answer 2580760
  day1part1: function() {
    this.clearElementById('day1part1-runtime')
    this.clearElementById('day1part1-out')
    const start = performance.now()

    fetch('text/day1')
    .then(r => r.text())
    .then(t => {
      var sum = 0
      var left = [] 
      var right = [] 
      t.split('\n').forEach((line) => {
        const numbers = line.split(/\s+/)
        if (numbers.length === 2) {
          left.push(numbers[0])
          right.push(numbers[1])
        }
      })
      
      left.sort()
      right.sort()

      for (var i = 0; i < left.length; ++i) {
        sum += Math.abs(left[i] - right[i])
      }

      this.outputLine('day1part1-out', `Result: ${sum}`)
      const end = performance.now()
      const runtimeElem = document.getElementById('day1part1-runtime')
      runtimeElem.innerText = (end - start).toFixed(2)
    })
  },

  // answer: 25358365
  day1part2: function() {
    this.clearElementById('day1part2-runtime')
    this.clearElementById('day1part2-out')
    const start = performance.now()
    var score = 0

    fetch('text/day1')
    .then(r => r.text())
    .then(t => {
      var left = new Map()
      var right = new Array()
      t.split(/\n/).forEach((line) => {
        const numbers = line.split(/\s+/)
        if (numbers.length === 2) {
          left.set(parseInt(numbers[0]), 0)
          right.push(parseInt(numbers[1]))
        } else {
          console.log('wat')
        }
      })

      for (const n of right) {
        if (left.has(n)) {
          left.set(n, left.get(n) + 1)
        }
      }

      for (const k of left.keys()) { score += k * left.get(k) }

      this.outputLine('day1part2-out', `Result: ${score}`)
      const end = performance.now()
      const runtimeElem = document.getElementById('day1part2-runtime')
      runtimeElem.innerText = (end - start).toFixed(2)
      
    })
  },

  // answer: 213
  day2part1: function() {
    this.clearElementById('day2part1-runtime')
    this.clearElementById('day2part1-out')
    const start = performance.now()
    var safeReports = 0

    fetch('text/day2')
    .then(r => r.text())
    .then(t => {
      for (line of t.split('\n')) {
        const report = line.split(/\s+/).map((s) => parseInt(s)) 
        if (this.isReportSafe(report)) ++safeReports
      }

      this.outputLine('day2part1-out', `Result: ${safeReports}`)
      const end = performance.now()
      const runtimeElem = document.getElementById('day2part1-runtime')
      runtimeElem.innerText = (end - start).toFixed(2)
    })
  },

  // answer: 285
  day2part2: function() {
    this.clearElementById('day2part2-runtime')
    this.clearElementById('day2part2-out')
    const start = performance.now()
    var safeReports = 0

    fetch('text/day2')
    .then(r => r.text())
    .then(t => {
      for (line of t.split('\n')) {
        const report = line.split(/\s+/).map((s) => parseInt(s)) 
        if (this.isReportSafe(report)) {
          ++safeReports
        } else {
          for (var i = 0; i < report.length; ++i) {
            const modArray = report.toSpliced(i, 1)
            if (this.isReportSafe(modArray)) {
              ++safeReports
              break
            }
          }
        }
      }

      this.outputLine('day2part2-out', `Result: ${safeReports}`)
      const end = performance.now()
      const runtimeElem = document.getElementById('day2part2-runtime')
      runtimeElem.innerText = (end - start).toFixed(2)
    })
  },

  // answer: 192767529
  day3part1: function() {
    this.clearElementById('day3part1-runtime')
    this.clearElementById('day3part1-out')
    const start = performance.now()
    var sum = 0

    fetch('text/day3')
    .then(r => r.text())
    .then(t => {
      var regex = /mul\((\d{1,3}),(\d{1,3})\)/g
      var matches = t.matchAll(regex) 
      for (match of matches) {
        sum += parseInt(match[1]) * parseInt(match[2])
      }

      this.outputLine('day3part1-out', `Result: ${sum}`)
      const end = performance.now()
      const runtimeElem = document.getElementById('day3part1-runtime')
      runtimeElem.innerText = (end - start).toFixed(2)
    })
  },
  
  // answer: 104083373
  day3part2: function() {
    this.clearElementById('day3part2-runtime')
    this.clearElementById('day3part2-out')
    const start = performance.now()
    var sum = 0

    fetch('text/day3')
    .then(r => r.text())
    .then(t => {
      var nextDont = 0
      var nextDo = 0
      while(true) {
        nextDont = t.indexOf('don\'t()', nextDo)
        if (nextDont === -1) nextDont = t.length - 1
        const substr = t.substring(nextDo, nextDont)
        const regex = /mul\((\d{1,3}),(\d{1,3})\)/g
        const matches = substr.matchAll(regex) 
        for (var match of matches) {
          sum += parseInt(match[1]) * parseInt(match[2])
        }

        nextDo = t.indexOf('do()', nextDont)
        if (nextDo === -1) break
        if (nextDont === t.length - 1) break
      }

      this.outputLine('day3part2-out', `Result: ${sum}`)
      const end = performance.now()
      const runtimeElem = document.getElementById('day3part2-runtime')
      runtimeElem.innerText = (end - start).toFixed(2)
    })
  },

  // answer: 2297
  day4part1: function() {
    this.clearElementById('day4part1-runtime')
    this.clearElementById('day4part1-out')
    const start = performance.now()
    var count = 0

    fetch('text/day4')
      .then(r => r.text())
      .then(t => {
      
      for (var y = 0; y < 140; ++y) {
        for (var x = 0; x < 141; ++x) {
          if (y >= 3 && this.isXMAS(t, (y * 141) + x, 0, -1)) { ++count }                    // up
          if (y >= 3 && x >= 3 && this.isXMAS(t, (y * 141) + x, -1, -1)) { ++count }         // up left
          if (y >= 3 && x <= 137 && this.isXMAS(t, (y * 141) + x, 1, -1)) { ++count }        // up right
          if (x >= 3 && this.isXMAS(t, (y * 141) + x, -1, 0)) { ++count }                    // left
          if (x <= 137 && this.isXMAS(t, (y * 141) + x, 1, 0)) { ++count }                   // right
          if (y <= (140 - 4) && this.isXMAS(t, (y * 141) + x, 0, 1)) { ++count }             // down
          if (y <= (140 - 4) && x >= 3 && this.isXMAS(t, (y * 141) + x, -1, 1)) { ++count }  // down left
          if (y <= (140 - 4) && x <= 137 && this.isXMAS(t, (y * 141) + x, 1, 1)) { ++count } // down right
        }
      }

      this.outputLine('day4part1-out', `Result: ${count}`)
      const end = performance.now()
      const runtimeElem = document.getElementById('day4part1-runtime')
      runtimeElem.innerText = (end - start).toFixed(2)
    })
  },

  day4part2: function() {
    this.clearElementById('day4part2-runtime')
    this.clearElementById('day4part2-out')
    const start = performance.now()

    fetch('text/day4')
      .then(r => r.text())
      .then(t => {
        this.outputLine('day4part2-out', `Result: TODO`)
        const end = performance.now()
        const runtimeElem = document.getElementById('day4part2-runtime')
        runtimeElem.innerText = (end - start).toFixed(2)
      })
  },

  isXMAS: function(str, index, xDir, yDir) {
    var xmasArray = ['X', 'M', 'A', 'S']
    var arr = [] 
    
    arr[0] = str[index]
    arr[1] = str[index + (yDir * 141) + xDir]
    arr[2] = str[index + ((yDir * 2) * 141) + (xDir * 2)]
    arr[3] = str[index + ((yDir * 3) * 141) + (xDir * 3)]

    var result = arr.length === xmasArray.length && arr.every((value, index) => value === xmasArray[index]) 
    return result
  },

  isReportSafe: function(report) {
    if (report === undefined || report.length < 2) return false
    const inc = report[0] < report[1]
    for (var i = 1; i < report.length; ++i) {
      if (report[i] === report[i-1]) return false
      if (inc && !this.inRange(report[i] - report[i-1], 1, 3)) return false
      if (!inc && !this.inRange(report[i-1] - report[i], 1, 3)) return false
    }

    return true
  },

  inRange: function(x, min, max) {
    return x>=min && x<=max
  },

  clearElementById: function(id) {
    var elem = document.getElementById(id)
    elem.innerHTML = ''
  },

  outputLine: function(id, text) {
    var container = document.getElementById(id)
    var elem = document.createElement('div')
    elem.innerText = text
    container.appendChild(elem)
  }
}

