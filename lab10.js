function rungeKutta(h, y0, a, b, precision) {
  let x = a;
  let y = y0;

  while (x < b) {
    let k1 = h * (y * y * Math.exp(-x) - y);
    let k2 = h * ((y + k1 / 2) * (y + k1 / 2) * Math.exp(-(x + h / 2)) - (y + k1 / 2));
    let k3 = h * ((y + k2 / 2) * (y + k2 / 2) * Math.exp(-(x + h / 2)) - (y + k2 / 2));
    let k4 = h * ((y + k3) * (y + k3) * Math.exp(-(x + h)) - (y + k3));

    y = y + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
    x += h;

    // Проверка на достижение заданной точности
    if (Math.abs(y - exactSolution(x)) < precision) {
      break;
    }
  }

  return { x, y };
}

function euler(h, y0, a, b, precision) {
  let x = a;
  let y = y0;

  while (x < b) {
    let yNext = y + h * (y * y * Math.exp(-x) - y);
    x += h;
    y = yNext;

    // Проверка на достижение заданной точности
    if (Math.abs(y - exactSolution(x)) < precision) {
      break;
    }
  }

  return { x, y };
}

function exactSolution(x) {
  return 1 / (1 + Math.exp(x));
}

function calculateMaxDeviation(approximate, exact) {
  let maxDeviation = 0;

  for (let i = 0; i < approximate.length; i++) {
    let deviation = Math.abs(approximate[i].y - exact(approximate[i].x));
    maxDeviation = Math.max(maxDeviation, deviation);
  }

  return maxDeviation;
}

// Параметры задачи
const y0 = 1;
const a = 1;
const b = 2;
const precision = 1e-6;

// Находим шаг для метода Рунге–Кутта
let hRungeKutta = 0.1;
let resultRungeKutta = rungeKutta(hRungeKutta, y0, a, b, precision);
console.log(`Шаг для метода Рунге–Кутта: ${resultRungeKutta.y};`)

// Построение приближенной интегральной кривой методом Рунге–Кутта
let rungeKuttaPoints = [{ x: a, y: y0 }];
while (rungeKuttaPoints[rungeKuttaPoints.length - 1].x < resultRungeKutta.x) {
  hRungeKutta = Math.min(hRungeKutta, resultRungeKutta.x - rungeKuttaPoints[rungeKuttaPoints.length - 1].x);
  resultRungeKutta = rungeKutta(hRungeKutta, y0, a, b, precision);
  rungeKuttaPoints.push({ x: resultRungeKutta.x, y: resultRungeKutta.y });
}

// Находим шаг для метода Эйлера
let hEuler = 0.1;
let resultEuler = euler(hEuler, y0, a, b, precision);
console.log(`Шаг для метода Эйлера: ${resultEuler.y};`)

// Сравнение точного решения с приближенным и вычисление максимума отклонений
let eulerPoints = [{ x: a, y: y0 }];
while (eulerPoints[eulerPoints.length - 1].x < resultEuler.x) {
  hEuler = Math.min(hEuler, resultEuler.x - eulerPoints[eulerPoints.length - 1].x);
  resultEuler = euler(hEuler, y0, a, b, precision);
  eulerPoints.push({ x: resultEuler.x, y: resultEuler.y });
}

let maxDeviation = calculateMaxDeviation(rungeKuttaPoints, exactSolution);
console.log(`Максимум модуля отклонений для метода Рунге–Кутта: ${maxDeviation};`);

maxDeviation = calculateMaxDeviation(eulerPoints, exactSolution);
console.log(`Максимум модуля отклонений для метода Эйлера": ${maxDeviation}.`);