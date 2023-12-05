// Функции для вычисления интегралов
function integrateRectangles(func, a, b, n) {
  const h = (b - a) / n;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const x = a + i * h;
    sum += func(x);
  }
  return h * sum;
}

function integrateTrapezoids(func, a, b, n) {
  const h = (b - a) / n;
  let sum = (func(a) + func(b)) / 2;
  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    sum += func(x);
  }
  return h * sum;
}

function integrateSimpson(func, a, b, n) {
  return ((b - a) / (6 * n) * (func(a) + 4 * func((a + b) / 2)) + func(b));
}

// Заданные функции для интегрирования
function func1(x) {
  return 1 / Math.sqrt(2 + x);
}

function func2(x) {
  return Math.pow(Math.cos(x), 2) * Math.cos(2 * x);
}

function func3(x) {
  return (x + 1) * (x + 2);
}

console.log('Результат метода прямоугольников:', integrateRectangles(func1, 0, 1, 1000));
console.log('Результат метода трапеций:', integrateTrapezoids(func2, 0, Math.PI, 1000));
console.log('Результат метода Симпсона:', integrateSimpson(func3, 0, 1, 1000));
