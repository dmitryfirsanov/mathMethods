function gaussianElimination(A, B) {
  const n = B.length;
  const X = new Array(n).fill(0);

  // i - индекс строки
  // j - индекс столбца
  // в этом цикле я прохожусь по строкам
  for (let i = 0; i < n; i++) {
    let maxRow = i;

    for (let j = i + 1; j < n; j++) {
      // этот цикл проходится по столбцам и ищет максимальный элемент в текущем столбце
      if (Math.abs(A[j][i]) > Math.abs(A[maxRow][i])) {
        maxRow = j;
      }
    }

    // меняю местами строки, чтобы строка максимальным значением столбца оказалась на главной диагонали
    [A[i], A[maxRow]] = [A[maxRow], A[i]];
    // так же меняю местами значения в матрице B
    [B[i], B[maxRow]] = [B[maxRow], B[i]];

    // прямой ход метода гаусса
    // с помощью него матрица приводится в верхнетреугольный вид
    for (let j = i + 1; j < n; j++) {
      const factor = A[j][i] / A[i][i];
      B[j] -= factor * B[i];
      A[j] = A[j].map((value, idx) => value - factor * A[i][idx]);
    }
  }

  // обратный ход метода гаусса, вычисление ответов
  for (let i = n - 1; i >= 0; i--) {
    X[i] = (B[i] - A[i].slice(i + 1).reduce((sum, value, idx) => sum + value * X[i + 1 + idx], 0)) / A[i][i];
  }

  return X;
}

const A = [
  [2.979, 0.427, 0.406, 0.348],
  [0.273, 3.951, 0.217, 0.327],
  [0.318, 0.197, 2.875, 0.166],
  [0.219, 0.231, 0.187, 3.276]
];

const B = [0.341, 0.844, 0.131, 0.381];

const solution = gaussianElimination(A, B);

console.log("Решение системы:");
solution.forEach((x, i) => {
  console.log(`x${i + 1} = ${x}`);
});
