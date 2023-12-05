// Матрица коэффициентов
const A = [
  [2.979, 0.427, 0.406, 0.348],
  [0.273, 3.951, 0.217, 0.327],
  [0.318, 0.197, 2.875, 0.166],
  [0.219, 0.231, 0.187, 3.276]
];

const B = [0.341, 0.844, 0.131, 0.381];

// Функция для вычисления значения функции G(x)
function calculateG() {
  const G = [
      [-A[0][1]/A[0][0], -A[0][2]/A[0][0], -A[0][3]/A[0][0], B[0]/A[0][0]],
      [-A[1][0]/A[1][1], -A[1][2]/A[1][1], -A[1][3]/A[1][1], B[1]/A[1][1]],
      [-A[2][0]/A[2][2], -A[2][1]/A[2][2], -A[2][3]/A[2][2], B[2]/A[2][2]],
      [-A[3][0]/A[3][3], -A[3][1]/A[3][3], -A[3][2]/A[3][3], B[3]/A[3][3]]
  ];

  return G;
}

// Функция для метода простой итерации
function simpleIterationMethodLinearSystem(initialGuess, tolerance, maxIterations) {
  let x = initialGuess;
  let iteration = 0;

  while (iteration < maxIterations) {
      const G = calculateG();
      const newX = [];

      for (let i = 0; i < x.length; i++) {
          let sum = G[i][G[i].length - 1];

          for (let j = 0; j < x.length; j++) {
              if (i !== j) {
                  sum += G[i][j] * x[j];
              }
          }

          newX[i] = sum;
      }

      // Проверяем условие сходимости
      if (Math.max(...newX.map((val, index) => Math.abs(val - x[index]))) < tolerance) {
          console.log(`Решение: x = [${newX.join(', ')}]`);
          console.log(`Количество итераций: ${iteration}`);
          return;
      }

      x = newX;
      iteration++;
  }

  console.log("Решение не найдено после максимального числа итераций.");
}

// Задаем начальное предположение, допустимую погрешность и максимальное количество итераций
const initialGuessLinearSystem = [0, 0, 0, 0];
const toleranceLinearSystem = 1e-6;
const maxIterationsLinearSystem = 1000;

// Запускаем метод простой итерации для системы линейных уравнений
simpleIterationMethodLinearSystem(initialGuessLinearSystem, toleranceLinearSystem, maxIterationsLinearSystem);
