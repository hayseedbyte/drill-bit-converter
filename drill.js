const conversion = {
  '#60': 0.04,
  '#59': 0.041,
  '#58': 0.042,
  '#57': 0.043,
  '#56': 0.0465,
  '#55': 0.052,
  '#54': 0.055,
  '#53': 0.0595,
  '#52': 0.0635,
  '#51': 0.067,
  '#50': 0.07,
  '#49': 0.073,
  '#48': 0.076,
  '#47': 0.0785,
  '#46': 0.081,
  '#45': 0.082,
  '#44': 0.086,
  '#43': 0.089,
  '#42': 0.0935,
  '#41': 0.096,
  '#40': 0.098,
  '#39': 0.0995,
  '#38': 0.1015,
  '#37': 0.104,
  '#36': 0.1065,
  '#35': 0.11,
  '#34': 0.111,
  '#33': 0.113,
  '#32': 0.116,
  '#31': 0.12,
  '#30': 0.1285,
  '#29': 0.136,
  '#28': 0.1405,
  '#27': 0.144,
  '#26': 0.147,
  '#25': 0.1495,
  '#24': 0.152,
  '#23': 0.154,
  '#22': 0.157,
  '#21': 0.159,
  '#20': 0.161,
  '#19': 0.166,
  '#18': 0.1695,
  '#17': 0.173,
  '#16': 0.177,
  '#15': 0.18,
  '#14': 0.182,
  '#13': 0.185,
  '#12': 0.189,
  '#11': 0.191,
  '#10': 0.1935,
  '#9': 0.196,
  '#8': 0.199,
  '#7': 0.201,
  '#6': 0.204,
  '#5': 0.2055,
  '#4': 0.209,
  '#3': 0.213,
  '#2': 0.221,
  '#1': 0.228,
  A: 0.234,
  B: 0.238,
  C: 0.242,
  D: 0.246,
  E: 0.25,
  F: 0.257,
  G: 0.261,
  H: 0.266,
  I: 0.272,
  J: 0.277,
  K: 0.281,
  L: 0.29,
  M: 0.295,
  N: 0.302,
  O: 0.316,
  P: 0.323,
  Q: 0.332,
  R: 0.339,
  S: 0.348,
  T: 0.358,
  U: 0.368,
  V: 0.377,
  W: 0.386,
  X: 0.397,
  Y: 0.404,
  Z: 0.413,
};

const fractionalObj = {
  0.0156: '1/64',
  0.0313: '1/32',
  0.0469: '3/64',
  0.0625: '1/16',
  0.0781: '5/64',
  0.0938: '3/32',
  0.1094: '7/64',
  0.125: '1/8',
  0.1406: '9/64',
  0.1563: '5/32',
  0.1719: '11/64',
  0.1875: '3/16',
  0.2031: '13/64',
  0.2188: '7/32',
  0.2344: '15/64',
  0.25: '1/4',
  0.2656: '17/64',
  0.2813: '9/32',
  0.2969: '19/64',
  0.3125: '5/16',
  0.3281: '21/64',
  0.3438: '11/32',
  0.3594: '23/64',
  0.375: '3/8',
  0.3906: '25/64',
  0.4063: '13/32',
  0.4219: '27/64',
  0.4375: '7/16',
  0.4531: '29/64',
  0.4688: '15/32',
  0.4844: '31/64',
  0.5: '1/2',
  0.5156: '33/64',
  0.5313: '17/32',
  0.5469: '35/64',
  0.5625: '9/16',
  0.5781: '37/64',
  0.5938: '19/32',
  0.6094: '39/64',
  0.625: '5/8',
  0.6406: '41/64',
  0.6719: '43/64',
  0.6875: '11/16',
  0.7031: '45/64',
  0.7188: '23/32',
  0.7344: '47/64',
  0.75: '3/4',
  0.7656: '49/64',
  0.7813: '25/32',
  0.7969: '51/64',
  0.8125: '13/16',
  0.8281: '53/64',
  0.8438: '27/32',
  0.8594: '55/64',
  0.875: '7/8',
  0.8906: '57/64',
  0.9063: '29/32',
  0.913: '21/23',
  0.9219: '59/64',
  0.9375: '15/16',
  0.9531: '61/64',
  0.9688: '31/32',
  0.9844: '63/64',
};

const letterWire = document.querySelector('#letter-wire');
const decimal = document.querySelector('#decimal');
const metric = document.querySelector('#metric');
const output = document.getElementById('output');
const button = document.getElementById('button');
const size = Number(letterWire.value);
let search;
let result;
let input;
let int = '';
let relationship;
const keys = Object.keys(fractionalObj);
function defaultValues() {
  letterWire.value = '';
  decimal.value = '';
  metric.value = '';
  search = undefined;
  result = undefined;
  input = undefined;
  relationship = undefined;
  int = '';
}
const larger = 'slightly larger than ';
const smaller = 'slightly smaller than ';
const exactly = 'exactly ';
const approx = 'nearest to';

const nearestValue = (arr, val) =>
  arr.reduce(
    (p, n) => (Math.abs(p) > Math.abs(n - val) ? n - val : p),
    Infinity
  ) + val;

button.addEventListener('click', e => {
  e.preventDefault();
  if (letterWire.value) {
    input = '#' + letterWire.value.toUpperCase() + ' ';
    search = convertLetterWire(letterWire.value);
    const num = Number(search);
    result = nearestValue(keys, conversion[search]);
    console.log(search);
    console.log(result);
    relationship = findRelationship(result, num);
  } else if (decimal.value) {
    input = decimal.value;
    const num = Number(input);
    const dec = num % 1;
    int = Math.trunc(num);
    result = nearestValue(keys, dec);
    const val = int + result;
    relationship = findRelationship(num, val);
  } else if (metric.value) {
    input = metric.value + ' mm';
    const num = Number(metric.value);
    const stan = metricToStandard(num);
    int = Math.trunc(stan);
    const dec = stan % 1;
    result = nearestValue(keys, dec);
    relationship = findRelationship(result, num);
  }
  console.log(result);
  const nearest = fractionalObj[result];
  const fractionalArray = nearest.split('/');
  const numerator = fractionalArray[0];
  const denominator = fractionalArray[1];
  if (int > 0) {
    output.innerHTML = `${input}   is ${relationship}... <div class="display-answer"><strong><span class="integral">${int}</span> <div class="frac">
    <span>${numerator} </span>
    <span class="symbol">/</span>
    <span class="bottom">${denominator} </span>
    
</div></strong></div>`;
  } else {
    output.innerHTML = `${input} is ${relationship}...<div class="display-answer"></span> <strong><div class="frac">
    <span>${numerator} </span>
    <span class="symbol">/</span>
    <span class="bottom">${denominator} </span>
    
</div></strong></div>`;
  }
  defaultValues();
});
const convertLetterWire = str => {
  const num = Number(str);
  console.log(num);
  if (num && num > 0 && num <= 60) {
    return '#' + str;
  } else if (!num && str.length === 1) {
    return str.toUpperCase();
  } else return 'error';
};

const metricToStandard = str => {
  const num = Number(str);
  console.log(num);

  return num / 25.4;
};
const findRelationship = function (n, r) {
  if (r < n) {
    return larger;
  } else if (r > n) {
    return smaller;
  } else if (n === r) {
    return exactly;
  } else {
    return approx;
  }
};
