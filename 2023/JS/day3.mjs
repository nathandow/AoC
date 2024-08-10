import * as fs from 'node:fs';

function isDigit(c) {
  return c >= 0 && c <= 9;
}

function isSymbol(c) {
  return c && c != '.' && !isDigit(c)
}

function extractNumber(str, i) {
  let step = i;
  while (isDigit(str[step])) { ++step; }
  let end = --step;
  let num = 0;
  let multiplier = 1;
  
  while (isDigit(str[step])) {
    num += str[step] * multiplier;
    multiplier = multiplier * 10;
    --step;
  }

  let start = step + 1;

  const number = {
    number: num,
    start: start,
    end: end
  };

  return number;
}

function isPart(lines, row, start, end) {
  if (!lines[row]) { return false; }

  for (var i = start; i <= end; ++i) {
    let n = null;
    let nw = null;
    let ne = null;
    if (lines[row - 1]) {
      n = lines[row - 1][i];
      nw = lines[row - 1][i - 1];
      ne = lines[row - 1][i + 1];
    }

    let s = null;
    let sw = null;
    let se = null;
    if (lines[row + 1]) {
      s = lines[row + 1][i];
      sw = lines[row + 1][i - 1];
      se = lines[row + 1][i + 1];
    }
    
    let w = lines[row][i - 1];
    let e = lines[row][i + 1];

    if (isSymbol(n) || isSymbol(nw) || isSymbol(ne) ||
        isSymbol(s) || isSymbol(sw) || isSymbol(se) ||
        isSymbol(w) || isSymbol(e)) {
      return true;
    }
  }

  return false;
}

function day3(file) {
  let data = null;
  try {
    data = fs.readFileSync(file, 'utf8');
  } catch (err) {
    console.log(`ERR: ${err}`);
    return;
  }

  let sum = 0;

  const lines = data.split('\n');
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    console.log(`[${line}]`);
    for (let j = 0; j < line.length; ++j) {
      if (isDigit(line.charAt(j))) {
        const xNum = extractNumber(line, j);
        const part = isPart(lines, i, xNum.start, xNum.end);
        if (part) {
          sum += xNum.number;
        }
        
        j = xNum.end;
      }
    }
  }

  return sum;
}

// we are expecting: 535078
console.log('DAY 3\n');
const out = day3('data/official_input_day3');
console.log(`OUT: ${out}`);
