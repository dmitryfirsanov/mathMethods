function seidelMethod(A, B, epsilon = 1e-8, maxIterations = 1000) {
  const n = A.length;
  const x = new Array(n).fill(0);

  for (let k = 0; k < maxIterations; k++) {
    let maxDiff = 0;

    for (let i = 0; i < n; i++) {
      let sum1 = 0;
      for (let j = 0; j < i; j++) {
        sum1 += A[i][j] * x[j];
      }

      let sum2 = 0;
      for (let j = i + 1; j < n; j++) {
        sum2 += A[i][j] * x[j];
      }

      const newX = (B[i] - sum1 - sum2) / A[i][i];
      maxDiff = Math.max(maxDiff, Math.abs(newX - x[i]));
      x[i] = newX;
    }

    if (maxDiff < epsilon) {
      console.log(`Converged in ${k + 1} iterations`);
      return x;
    }
  }

  console.log("Did not converge within the specified number of iterations");
  return null;
}

const A = [
  [2.979, 0.427, 0.406, 0.348],
  [0.273, 3.951, 0.217, 0.327],
  [0.318, 0.197, 2.875, 0.166],
  [0.219, 0.231, 0.187, 3.276]
];

const B = [0.341, 0.844, 0.131, 0.381];

const result = seidelMethod(A, B);
console.log("Solution:", result);
