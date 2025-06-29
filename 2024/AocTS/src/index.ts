import * as FS from "node:fs";

day1part1();
day1part2();
day2part1();
day2part2();
day3part1();
day3part2();
day4part1();
day4part2();
day5part1();
day5part2();
day6part1();
day6part2();

// answer 2580760
function day1part1() {
  const start = performance.now();
  const data = FS.readFileSync("text/day1").toString();
  var sum = 0;

  var left: number[] = [];
  var right: number[] = [];
  data.split("\n").forEach((line) => {
    const numbers = line.split(/\s+/);
    if (numbers.length === 2) {
      left.push(parseInt(numbers[0]));
      right.push(parseInt(numbers[1]));
    }
  });

  left.sort();
  right.sort();

  for (var i = 0; i < left.length; ++i) {
    sum += Math.abs(left[i] - right[i]);
  }

  const end = performance.now();
  console.log(`1-1: ${sum} in ${(end - start).toFixed(2)}`);
}

// answer: 25358365
function day1part2() {
  const start = performance.now();
  const data = FS.readFileSync("text/day1").toString();
  var score = 0;

  var left: Map<number, number> = new Map();
  var right: number[] = [];

  data.split("\n").forEach((line) => {
    const numbers = line.split(/\s+/);
    if (numbers.length === 2) {
      left.set(parseInt(numbers[0]), 0);
      right.push(parseInt(numbers[1]));
    }
  });

  for (const n of right) {
    if (left.has(n)) {
      left.set(n, left.get(n)! + 1);
    }
  }

  for (const k of left.keys()) {
    score += k * left.get(k)!;
  }

  const end = performance.now();
  console.log(`1-2: ${score} in ${(end - start).toFixed(2)}`);
}

// answer: 213
function day2part1() {
  const start = performance.now();
  const data = FS.readFileSync("text/day2").toString();
  var safeReports = 0;

  data.split("\n").forEach((line) => {
    const report: number[] = line.split(/\s+/).map((s) => parseInt(s));
    if (isReportSafe(report)) ++safeReports;
  });

  const end = performance.now();
  console.log(`2-1: ${safeReports} in ${(end - start).toFixed(2)}`);
}

function isReportSafe(report: number[]) {
  if (report === undefined || report.length < 2) return false;
  const inc = report[0] < report[1];
  for (var i = 1; i < report.length; ++i) {
    if (report[i] === report[i - 1]) return false;
    if (inc && !inRange(report[i] - report[i - 1], 1, 3)) return false;
    if (!inc && !inRange(report[i - 1] - report[i], 1, 3)) return false;
  }

  return true;
}

function inRange(x: number, min: number, max: number) {
  return x >= min && x <= max;
}

// answer: 285
function day2part2() {
  const start = performance.now();
  const data = FS.readFileSync("text/day2").toString();
  var safeReports = 0;

  data.split("\n").forEach((line) => {
    const report: number[] = line.split(/\s+/).map((s) => parseInt(s));
    if (isReportSafe(report)) {
      ++safeReports;
    } else {
      for (var i = 0; i < report.length; ++i) {
        var reportCopy = report.slice();
        reportCopy.splice(i, 1);
        if (isReportSafe(reportCopy)) {
          ++safeReports;
          break;
        }
      }
    }
  });

  const end = performance.now();
  console.log(`2-2: ${safeReports} in ${(end - start).toFixed(2)}`);
}

// answer: 192767529
function day3part1() {
  const start = performance.now();
  const data = FS.readFileSync("text/day3").toString();
  var sum = 0;

  var regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const matches = data.matchAll(regex);
  for (const match of matches) {
    sum += parseInt(match[1]) * parseInt(match[2]);
  }

  const end = performance.now();
  console.log(`3-1: ${sum} in ${(end - start).toFixed(2)}`);
}

// answer: 104083373
function day3part2() {
  const start = performance.now();
  const data = FS.readFileSync("text/day3").toString();
  var sum = 0;

  var nextDont = 0;
  var nextDo = 0;
  while (true) {
    nextDont = data.indexOf("don't()", nextDo);
    if (nextDont === -1) nextDont = data.length - 1;
    const substr = data.substring(nextDo, nextDont);
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const matches = substr.matchAll(regex);
    for (const match of matches) {
      sum += parseInt(match[1]) * parseInt(match[2]);
    }

    nextDo = data.indexOf("do()", nextDont);
    if (nextDo === -1) break;
    if (nextDont === data.length - 1) break;
  }

  const end = performance.now();
  console.log(`3-2: ${sum} in ${(end - start).toFixed(2)}`);
}

// answer: 2297
function day4part1() {
  const start = performance.now();
  const data = FS.readFileSync("text/day4").toString();
  var count = 0;

  for (var y = 0; y < 140; ++y) {
    for (var x = 0; x < 141; ++x) {
      // up
      if (y >= 3 && isXMAS(data, y * 141 + x, 0, -1)) {
        ++count;
      }

      // up left
      if (y >= 3 && x >= 3 && isXMAS(data, y * 141 + x, -1, -1)) {
        ++count;
      }

      // up right
      if (y >= 3 && x <= 137 && isXMAS(data, y * 141 + x, 1, -1)) {
        ++count;
      }

      // left
      if (x >= 3 && isXMAS(data, y * 141 + x, -1, 0)) {
        ++count;
      }

      // right
      if (x <= 137 && isXMAS(data, y * 141 + x, 1, 0)) {
        ++count;
      }

      // down
      if (y <= 140 - 4 && isXMAS(data, y * 141 + x, 0, 1)) {
        ++count;
      }

      // down left
      if (y <= 140 - 4 && x >= 3 && isXMAS(data, y * 141 + x, -1, 1)) {
        ++count;
      }

      // down right
      if (y <= 140 - 4 && x <= 137 && isXMAS(data, y * 141 + x, 1, 1)) {
        ++count;
      }
    }
  }

  const end = performance.now();
  console.log(`4-1: ${count} in ${(end - start).toFixed(2)}`);
}

function isXMAS(str: string, index: number, xDir: number, yDir: number) {
  const xmasArray: string[] = ["X", "M", "A", "S"];
  var arr: string[] = [];

  arr[0] = str[index];
  arr[1] = str[index + yDir * 141 + xDir];
  arr[2] = str[index + yDir * 2 * 141 + xDir * 2];
  arr[3] = str[index + yDir * 3 * 141 + xDir * 3];

  const result =
    arr.length === xmasArray.length &&
    arr.every((value, index) => value === xmasArray[index]);
  return result;
}

// answer: 1745
function day4part2() {
  const start = performance.now();
  const data = FS.readFileSync("text/day4").toString();
  var count = 0;

  for (var y = 0; y < 139; ++y) {
    for (var x = 0; x < 139; ++x) {
      if (isCrossMAS(data, y * 141 + x)) ++count;
    }
  }

  const end = performance.now();
  console.log(`4-2: ${count} in ${(end - start).toFixed(2)}`);
}

function isCrossMAS(str: string, index: number): boolean {
  if (str[index] !== "A") {
    return false;
  }

  var leftToRight = false;
  if (
    (str[index - 142] === "M" && str[index + 142] === "S") ||
    (str[index - 142] === "S" && str[index + 142] === "M")
  ) {
    leftToRight = true;
  }

  var rightToLeft = false;
  if (
    (str[index - 140] === "M" && str[index + 140] === "S") ||
    (str[index - 140] === "S" && str[index + 140] === "M")
  ) {
    rightToLeft = true;
  }

  return leftToRight && rightToLeft;
}

// answer: 4281
function day5part1() {
  const start = performance.now();
  const data = FS.readFileSync("text/day5").toString().split("\n\n");
  const rules: Set<string> = new Set(data[0].split("\n"));
  const updates: string[] = data[1].split("\n");

  function pageSort(left: string, right: string): number {
    const str = left + "|" + right;
    if (rules.has(str)) return -1;
    if (rules.has(right + "|" + left)) return 1;
    return 0;
  }

  let sum = 0;
  for (const u of updates) {
    let pages = u.split(",");
    let sorted = pages.slice(0).sort(pageSort);

    let correct = true;
    for (let e = 0; e < pages.length; ++e) {
      if (sorted[e] !== pages[e]) {
        correct = false;
        break;
      }
    }

    if (correct) {
      sum += parseInt(pages[Math.floor(pages.length / 2)]);
    }
  }

  const end = performance.now();
  console.log(`5-1: ${sum} in ${(end - start).toFixed(2)}`);
}

// answer: 5466
function day5part2() {
  const start = performance.now();
  const data = FS.readFileSync("text/day5").toString().split("\n\n");
  const rules: Set<string> = new Set(data[0].split("\n"));
  const updates: string[] = data[1].split("\n");

  function pageSort(left: string, right: string): number {
    const str = left + "|" + right;
    if (rules.has(str)) return -1;
    if (rules.has(right + "|" + left)) return 1;
    return 0;
  }

  let sum = 0;
  for (const u of updates) {
    let pages = u.split(",");
    let sorted = pages.slice(0).sort(pageSort);

    let isSorted = false;
    for (let e = 0; e < sorted.length; ++e) {
      if (sorted[e] !== pages[e]) {
        isSorted = true;
      }
    }

    if (isSorted) {
      sum += parseInt(sorted[Math.floor(sorted.length / 2)]);
    }
  }

  const end = performance.now();
  console.log(`5-2: ${sum} in ${(end - start).toFixed(2)}`);
}

// answer: 5199
function day6part1() {
  const LEN = 130;

  function turnLookup(dir: string): string {
    switch (dir) {
      case "^":
        return ">";
      case ">":
        return "v";
      case "v":
        return "<";
      case "<":
        return "^";
    }

    return "";
  }

  function backup(dir: string): number[] {
    switch (dir) {
      case "^":
        return [1, 0];
      case ">":
        return [0, -1];
      case "v":
        return [-1, 0];
      case "<":
        return [0, 1];
    }

    return [0, 0];
  }

  function isGuard(c: string): boolean {
    return c === "^" || c === "v" || c === "<" || c === ">";
  }

  function walk(dir: string, y: number, x: number): number {
    //console.log(`walk: ${dir} (${y},${x})`);
    let wdir = dir;
    let wy = y;
    let wx = x;
    let wturns = 0;

    while (true) {
      switch (wdir) {
        case "^":
          --wy;
          break;
        case ">":
          ++wx;
          break;
        case "v":
          ++wy;
          break;
        case "<":
          --wx;
          break;
      }

      if (wy < 0 || wy === LEN || wx < 0 || wx === LEN) break;

      //console.log(`    : ${dir} (${wy},${wx})`);
      if (data[wy][wx] === "#") {
        //console.log(`bonk: ${dir} (${wy},${wx})`);
        const backCoords = backup(wdir);
        wy += backCoords[0];
        wx += backCoords[1];
        wdir = turnLookup(wdir);
        ++wturns;
        const childTurns = walk(wdir, wy, wx);
        wturns += childTurns;
        return wturns;
      } else {
        nodes.add(`${wy}_${wx}`);
      }
    }

    return wturns;
  }

  const start = performance.now();
  const data = FS.readFileSync("text/day6").toString().split("\n");

  let nodes: Set<string> = new Set<string>();
  let turns = 1;
  for (let y = 0; y < LEN; ++y) {
    for (let x = 0; x < LEN; ++x) {
      if (isGuard(data[y][x])) {
        nodes.add(`${y}_${x}`);
        turns += walk(data[y][x], y, x);
        break;
      }
    }
  }

  //console.log(`nodes: ${nodes.size}`);
  const end = performance.now();
  console.log(`6-1: ${nodes.size} in ${(end - start).toFixed(2)}`);
}

function day6part2() {
  const start = performance.now();
  const LEN = 10;
  const data = FS.readFileSync("text/d6_test2").toString().split("\n");

  console.log(data);

  const end = performance.now();
  console.log(`6-2: TODO in ${(end - start).toFixed(2)}`);
}
