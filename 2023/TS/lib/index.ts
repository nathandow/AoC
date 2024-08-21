import * as FS from 'node:fs';

const english_digit = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9
};

class PartNumber {
  number: number;
  start: number;
  end: number;

  constructor(number: number, start: number, end: number) {
    this.number = number;
    this.start = start;
    this.end = end;
  }

  equals(partNumber: PartNumber): boolean {
    if (PartNumber === null) { return false; }
    return partNumber.number === this.number &&
           partNumber.start === this.start &&
           partNumber.end === this.end;
  }

  isContainedBy(numbers: PartNumber[]): boolean {
    for (const n of numbers) {
      if (n.equals(this)) { return true; }
    }
    return false;
  }
}

function isNumber(c: string): boolean {
  if (!c) { return false; }
  return c.charCodeAt(0) >= '0'.charCodeAt(0) && c.charCodeAt(0) <= '9'.charCodeAt(0);
}

function getAsNumber(str: string, offset: number): number {
  if (isNumber(str[offset])) {
    return str[offset].charCodeAt(0) - '0'.charCodeAt(0);
  }

  for (const [key, value] of Object.entries(english_digit)) {
    if (str.startsWith(key, offset)) { return value; }
  }

  return NaN;
}

function readData(file: string): string {
  try {
    return FS.readFileSync(file, 'utf8');
  } catch (err: any) {
    console.error(`ERR: ${err}`);
    process.exit(1);
  }
}

function isSymbol(c: string) {
  return c && c != '.' && !isNumber(c)
}

function isGear(c: string) {
  return isSymbol(c) && c === '*';
}

function extractNumber(str: string, i: number): PartNumber {
  if (!isNumber(str[i])) { return new PartNumber(NaN, i, i); }
  
  let step = i;
  while (isNumber(str[step])) { ++step; }
  let end = --step;
  let num = 0;
  let multiplier = 1;

  while (isNumber(str[step])) {
    num += parseInt(str[step]) * multiplier;
    multiplier = multiplier * 10;
    --step;
  }

  let start = step + 1;

  if (num === 0) { num = NaN; }
  return new PartNumber(num, start, end);
}

function isPart(lines: string[], row: number, start: number, end: number) {
  if (!lines[row]) { return false; }

  for (var i = start; i <= end; ++i) {
    if (lines[row - 1]) {
      const n = lines[row - 1][i];
      const nw = lines[row - 1][i - 1];
      const ne = lines[row - 1][i + 1];
      if (isSymbol(n) || isSymbol(nw) || isSymbol(ne)) {
        return true;
      }
    }

    if (lines[row + 1]) {
      const s = lines[row + 1][i];
      const sw = lines[row + 1][i - 1];
      const se = lines[row + 1][i + 1];
      if (isSymbol(s) || isSymbol(sw) || isSymbol(se)) {
        return true;
      }
    }

    const w = lines[row][i - 1];
    const e = lines[row][i + 1];
    if (isSymbol(w) || isSymbol(e)) {
      return true;
    }
  }

  return false;
}

function walkNeighbours(lines: string[], row: number, col: number): PartNumber[] {
  let numbers: PartNumber[] = [];

  // north
  if (row - 1 >= 0) {
    try {
      const nw = extractNumber(lines[row - 1], col - 1);
      if (nw && !isNaN(nw.number) && !nw.isContainedBy(numbers)) { numbers.push(nw); }
    } catch(err) {}

    try {
      const n = extractNumber(lines[row - 1], col);
      if (n && !isNaN(n.number) && !n.isContainedBy(numbers)) { numbers.push(n); }
    } catch(err) {}

    try {
      const ne = extractNumber(lines[row - 1], col + 1);
      if (ne && !isNaN(ne.number) && !ne.isContainedBy(numbers)) { numbers.push(ne); }
    } catch(err) {}
  }

  // west & east
  try {
    const w = extractNumber(lines[row], col - 1);
    if (w && !isNaN(w.number) && !w.isContainedBy(numbers)) { numbers.push(w); }
  } catch(error) {}

  try {
    const e = extractNumber(lines[row], col + 1);
    if (e && !isNaN(e.number) && !e.isContainedBy(numbers)) { numbers.push(e); }
  } catch(err) {}

  // south
  if (row + 1 <= (lines.length - 1)) {
     try {
      const sw = extractNumber(lines[row + 1], col - 1);
      if (sw && !isNaN((sw.number)) && !sw.isContainedBy(numbers)) { numbers.push(sw); }
    } catch(err) {}

    try {
      const s = extractNumber(lines[row + 1], col);
      if (s && !isNaN((s.number)) && !s.isContainedBy(numbers)) { numbers.push(s); }
    } catch(err) {}

    try {
      const se = extractNumber(lines[row + 1], col + 1);
      if (se && !isNaN((se.number)) && !se.isContainedBy(numbers)) { numbers.push(se); }
    } catch(err) {}
  }

  return numbers;
}

function day1(data: string): number {
  let sum = 0;

  const lines = data.split('\n');
  lines.forEach(line => {
    let start = 0;
    let end = 0;
    for (let i = 0; i < line.length; ++i) {
      if (start === 0) {
        let num = getAsNumber(line, i);
        if (!Number.isNaN(num) && num > 0) { start = num; }
      }

      if (end === 0) {
        let num = getAsNumber(line, line.length - (i + 1));
        if (!Number.isNaN(num) && num > 0) { end = num; }
      }

      if (start != 0 && end != 0) {
        sum += start * 10 + end;
        break;
      }
    }
  });

  return sum;
}

function day2(data: string, r: number, g: number, b: number): number {
  let sum = 0;

  const lines = data.split('\n');
  lines.forEach(line => {
    const line_split = line.split(': ');
    if (!line_split[0] || !line_split[1]) {
      return;
    }

    const game_id = parseInt(line_split[0].split(' ')[1]);
    const dice_field = line_split[1].split(/(?:,|;)+/);

    let max = {
      r: 0,
      g: 0,
      b: 0
    };

    dice_field.forEach(die => {
      const split_die = die.trim().split(' ');
      if (split_die[1] === 'red') { max.r = Math.max(max.r, parseInt(split_die[0])); }
      if (split_die[1] === 'green') { max.g = Math.max(max.g, parseInt(split_die[0])); }
      if (split_die[1] === 'blue') { max.b = Math.max(max.b, parseInt(split_die[0])); }
    });

    if (max.r <= r && max.g <= g && max.b <= b) {
      sum += game_id;
    }
  });

  return sum;
}

function day2Part2(data: string): number {
  let sum = 0;

  const lines = data.split('\n');
  lines.forEach(line => {
    const line_split = line.split(': ');
    if (!line_split[0] || !line_split[1]) {
      return;
    }

    const dice_field = line_split[1].split(/(?:,|;)+/);

    let max = {
      r: 0,
      g: 0,
      b: 0
    };

    dice_field.forEach(die => {
      const split_die = die.trim().split(' ');
      if (split_die[1] === 'red') { max.r = Math.max(max.r, parseInt(split_die[0])); }
      if (split_die[1] === 'green') { max.g = Math.max(max.g, parseInt(split_die[0])); }
      if (split_die[1] === 'blue') { max.b = Math.max(max.b, parseInt(split_die[0])); }
    });

    sum += (max.r * max.g * max.b);
  });

  return sum;
}

function day3Part1(data: string): number {
  let sum = 0;

  const lines = data.split('\n');
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    for (let j = 0; j < line.length; ++j) {
      if (isNumber(line.charAt(j))) {
        const num = extractNumber(line, j);
        const part = isPart(lines, i, num.start, num.end);
        if (part) {
          sum += num.number;
        }

        j = num.end;
      }
    }
  }

  return sum;
}

function day3Part2(data: string): number {
  let sum = 0;
  const lines = data.split('\n');
  for (let row = 0; row < lines.length; ++row) {
    if (lines[row].length === 0) { continue; }
    for (let col = 0; col < lines[row].length; ++col) {
      if (isGear(lines[row][col])) {
        const neighbours = walkNeighbours(lines, row, col);
        if (neighbours.length === 2) {
          sum += neighbours[0].number * neighbours[1].number;
        }
      }
    }
  }

  return sum;
}

const day1Data = readData('data/official_input_day1');
console.log("DAY 1");
console.log('Expecting: 55686');
console.log('--------------------------------------------------------------------------------');
console.time(('TIME: '));
console.log(`OUT: ${day1(day1Data)}`);
console.timeEnd(('TIME: '));
console.log();

const day2Data = readData('data/official_input_day2');
console.log("DAY 2 - Part 1");
console.log('Expecting: 2632');
console.log('--------------------------------------------------------------------------------');
console.time('TIME: ');
console.log(`OUT: ${day2(day2Data, 12, 13, 14)}`);
console.timeEnd('TIME: ');
console.log();

console.log("DAY 2 - Part 2");
console.log('Expecting: 69629');
console.log('--------------------------------------------------------------------------------');
console.time('TIME: ');
console.log(`OUT: ${day2Part2(day2Data)}`);
console.timeEnd('TIME: ');
console.log();

const day3Data = readData('data/official_input_day3');
console.log("DAY 3 - Part 1");
console.log('Expecting: 535078');
console.log('--------------------------------------------------------------------------------');
console.time('TIME: ');
console.log(`OUT: ${day3Part1(day3Data)}`);
console.timeEnd('TIME: ');
console.log();

console.log("DAY 3 - Part 2");
console.log('Expecting: 75312571');
console.log('--------------------------------------------------------------------------------');
console.time('TIME: ');
console.log(`OUT: ${day3Part2(day3Data)}`);
console.timeEnd('TIME: ');
console.log();

