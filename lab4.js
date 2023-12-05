function choleskyDecomposition(A, B) {
  const size = B.length;
  const Lt = Array.from({ length: size }, () => new Array(size).fill(0)); // Транспонированная верхняя треугольная матрица
  const L = Array.from({ length: size }, () => new Array(size).fill(0));  // Нижняя треугольная матрица
  const y = new Array(size).fill(0);   // Вектор у-ков
  const xVector = new Array(size).fill(0); // Вектор иксов

  // Находим нижнюю треугольную матрицу
  L[0][0] = Math.sqrt(A[0][0]);
  for (let i = 1; i < size; i++) {
      let sumJElem = 0.0;
      for (let j = 1; j <= size; j++) {
          if (j - 1 >= i) {
              continue;
          }
          for (let k = 0; k < j - 1; k++) {
              sumJElem += L[i][k] * L[j - 1][k];
          }
          L[i][j - 1] = (A[i][j - 1] - sumJElem) / L[j - 1][j - 1];
      }

      let sumIElem = 0.0;
      for (let k = 0; k < i; k++) {
          sumIElem += L[i][k] * L[i][k];
      }
      L[i][i] = Math.sqrt(A[i][i] - sumIElem);
  }

  // Транспонируем матрицу L и получаем матрицу Lt
  for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
          Lt[i][j] = L[j][i];
      }
  }

  // Рассчитываем вектор у
  for (let i = 0; i < size; i++) {
      let summa = 0.0;
      for (let j = 0; j < i; j++) {
          summa += L[i][j] * y[j];
      }
      y[i] = (B[i] - summa) / L[i][i];
  }

  // Находим значение наших иксов
  for (let i = size - 1; i >= 0; i--) {
      let summa = 0;
      for (let j = size - 1; j > i; j--) {
          summa += Lt[i][j] * xVector[j];
      }
      xVector[i] = (y[i] - summa) / Lt[i][i];
  }

  return xVector;
}

// Матрица A и вектор B
const A = [
  [81, -45, 45],
  [-45, 50, -15],
  [45, -15, 38]
];

const B = [531, -460, 193];

// Решение системы уравнений
const xSolution = choleskyDecomposition(A, B);

// Вывод решения
xSolution.forEach((x, i) => {
  console.log(`x${i + 1} = ${x}`);
});
