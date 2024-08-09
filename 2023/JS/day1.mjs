import * as fs from 'node:fs';

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

function isDigit(c) {
  return c >= '0' && c<='9';
}

function getAsDigit(str, offset) {
  if (isDigit(str[offset])) {
    return str[offset] - '0';
  }

  for (const [key, value] of Object.entries(english_digit)) {
    if (str.startsWith(key, offset)) { return value; }
  }

  return null;
}

function day1(file) {
  var data;

  try {
    data = fs.readFileSync(file, 'utf8');
  } catch (err) {
    console.log(`ERR: ${err}`);
    return;
  }
  
  var sum = 0;
  const lines = data.split('\n');
  lines.forEach(line => {
    var start = 0;
    var end = 0;
    for (var i = 0; i <= line.length; i++) {
      if (start != 0 && end != 0) {
        var combined = start * 10 + end;
        sum += combined;
        break;
      }

      if (start === 0) {
        var start_digit = getAsDigit(line, i);
        if (start_digit !== null) {
          start = start_digit - '0';
        }
      }

      if (end === 0) {
        var end_digit = getAsDigit(line, line.length - (i + 1));
        if (end_digit !== null) {
          end = end_digit - '0';
        }
      }
    }
  });

  return sum;
}

console.log('DAY 1');
console.log('-------------------------------------------------------------');
var out = day1('data/official_input_day1');
console.log(`OUT: ${out}`);
