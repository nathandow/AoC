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

function day2(file, r, g, b) {
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
    const line_split = line.split(': ');
    if (!line_split[0] || !line_split[1]) {
      return;
    }

    const game_id = parseInt(line_split[0].split(' ')[1]);
    const dice_field = line_split[1].split(/(?:,|;)+/);
   
    var max = {
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

function day2Part2(file) {
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
    const line_split = line.split(': ');
    if (!line_split[0] || !line_split[1]) {
      return;
    }

    const game_id = parseInt(line_split[0].split(' ')[1]);
    const dice_field = line_split[1].split(/(?:,|;)+/);
   
    var max = {
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

console.log('DAY 2');
console.log('-------------------------------------------------------------');
var out = day2('data/official_input_day2', 12, 13, 14);
console.log(`OUT: ${out}`);
console.log()

console.log('DAY 2 - Part 2');
console.log('-------------------------------------------------------------');
var out = day2Part2('data/official_input_day2');
console.log(`OUT: ${out}`);
console.log();
