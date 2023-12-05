function interpolateNewtonFirstForm(xValues, yValues, x) {
  if (xValues.length !== yValues.length) {
    throw new Error('Массивы xValues и yValues должны иметь одинаковую длину');
  }

  const n = xValues.length;
  const differences = []; // массив разностей

  // заполняю массив значениями y
  for (let i = 0; i < n; i++) {
    differences.push(yValues[i]);
  }

  // разности / переопределяю значения массива differences
  for (let i = 1; i < n; i++) {
    for (let j = n - 1; j >= i; j--) {
      differences[j] = (differences[j] - differences[j - 1]) / (xValues[j] - xValues[j - i]);
    }
  }

  let result = differences[0];

  // нахождение результата
  for (let i = 1; i < n; i++) {
    let term = differences[i];
    for (let j = 0; j < i; j++) {
      term *= (x - xValues[j]);
    }
    result += term;
  }

  return result;
}

function interpolateNewtonSecondForm(xValues, yValues, x) {
  if (xValues.length !== yValues.length) {
    throw new Error('Массивы xValues и yValues должны иметь одинаковую длину');
  }

  const n = xValues.length;
  const differences = []; // массив разностей

  // заполняю массив значениями y
  for (let i = 0; i < n; i++) {
    differences.push(yValues[i]);
  }

  // разности / переопределяю значения массива differences
  for (let i = 1; i < n; i++) {
    for (let j = n - 1; j >= i; j--) {
      differences[j] = (differences[j] - differences[j - 1]) / (xValues[j] - xValues[j - i]);
    }
  }

  let result = differences[n - 1];

  // нахождение результата
  for (let i = n - 2; i >= 0; i--) {
    result = result * (x - xValues[i]) + differences[i];
  }

  return result;
}

const xValues = [300, 400, 500, 600];
const yValues = [52.88, 65.61, 78.07, 99.24];
const x = 700;

let result = interpolateNewtonFirstForm(xValues, yValues, x);
console.log(`Значение функции (первая формула) для x=${x}: ${result}`);

result = interpolateNewtonSecondForm(xValues, yValues, x);
console.log(`Значение функции (первая формула) для x=${x}: ${result}`);
