function linearInterpolation(x, xValues, yValues) {
  // Найдем ближайшие узлы
  let i = 0;
  while (i < xValues.length - 1 && x > xValues[i + 1]) {
      i++;
  }

  // Выполним линейную интерполяцию
  const xI = xValues[i];
  const xIp1 = xValues[i + 1];
  const yI = yValues[i];
  const yIp1 = yValues[i + 1];

  const yInterpolated = yI + (x - xI) * (yIp1 - yI) / (xIp1 - xI);

  return yInterpolated;
}

// Заданные данные
const xValues = [300, 400, 500, 600];
const yValues = [52.88, 65.61, 78.07, 99,24];

// Точка, в которой нужно вычислить значение
const x = 450;

// Выполним интерполяцию
const yInterpolated = linearInterpolation(x, xValues, yValues);

console.log(`Значение функции в точке x = ${x} равно ${yInterpolated}`);
