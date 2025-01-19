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

