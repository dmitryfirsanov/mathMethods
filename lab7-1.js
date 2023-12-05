function f(x) {
  return x - 1.2 * Math.cos(x / 3);
}

// Функция для метода простой итерации
function simpleIterationMethod(initialGuess, tolerance, maxIterations) {
  let x = initialGuess;
  let iteration = 0;


  while (Math.abs(f(x)) > tolerance && iteration < maxIterations) {
      // привожу уравнение к виду x = g(x)
      x = 1.2 * Math.cos(x / 3);
      iteration++;
  }

  if (iteration === maxIterations) {
      console.log("Решение не найдено после максимального числа итераций.");
  } else {
      console.log(`Решение: x = ${x}`);
      console.log(`Количество итераций: ${iteration}`);
  }
}

const initialGuess = 0;
const tolerance = 1e-6;
const maxIterations = 1000;

simpleIterationMethod(initialGuess, tolerance, maxIterations);
