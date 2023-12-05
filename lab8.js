// Метод наименьших квадратов для линейной функции: y = mx + b
function linearLeastSquares(x, y) {
  const n = x.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

  for (let i = 0; i < n; i++) {
      sumX += x[i];
      sumY += y[i];
      sumXY += x[i] * y[i];
      sumX2 += x[i] * x[i];
  }

  const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const b = (sumY - m * sumX) / n;

  return { m, b };
}

// Метод наименьших квадратов для степенной функции: y = a * x^b
function powerLeastSquares(x, y) {
  const n = x.length;
  let sumLogX = 0, sumLogY = 0, sumLogXLogY = 0, sumLogX2 = 0;

  for (let i = 0; i < n; i++) {
      sumLogX += Math.log(x[i]);
      sumLogY += Math.log(y[i]);
      sumLogXLogY += Math.log(x[i]) * Math.log(y[i]);
      sumLogX2 += Math.log(x[i]) * Math.log(x[i]);
  }

  const b = (n * sumLogXLogY - sumLogX * sumLogY) / (n * sumLogX2 - sumLogX * sumLogX);
  const a = Math.exp((sumLogY - b * sumLogX) / n);

  return { a, b };
}

// Метод наименьших квадратов для показательной функции: y = a * e^(bx)
function exponentialLeastSquares(x, y) {
  const n = x.length;
  let sumX = 0, sumLogY = 0, sumXLogY = 0, sumX2 = 0;

  for (let i = 0; i < n; i++) {
      sumX += x[i];
      sumLogY += Math.log(y[i]);
      sumXLogY += x[i] * Math.log(y[i]);
      sumX2 += x[i] * x[i];
  }

  const b = (n * sumXLogY - sumX * sumLogY) / (n * sumX2 - sumX * sumX);
  const a = Math.exp((sumLogY - b * sumX) / n);

  return { a, b };
}

// Исходные данные
const x = [59.2, 59.0, 54.2, 55.6, 53.1, 57.8, 60.9];
const y = [49.7, 50.5, 51.9, 54.4, 57.3, 64.8, 49.0];

// Вычисление параметров для линейной функции
const linearParams = linearLeastSquares(x, y);
console.log("Линейная функция: y =", linearParams.m, "* x +", linearParams.b);

// Вычисление параметров для степенной функции
const powerParams = powerLeastSquares(x, y);
console.log("Степенная функция: y =", powerParams.a, "* x^", powerParams.b);

// Вычисление параметров для показательной функции
const exponentialParams = exponentialLeastSquares(x, y);
console.log("Показательная функция: y =", exponentialParams.a, "* e^(", exponentialParams.b, " * x)");
