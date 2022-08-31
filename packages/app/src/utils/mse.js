import { subtract, dotPow, sum } from "mathjs";

// hypothesis is the predicted y value
// y is the actual value
// returns: the mean square error
export default function meanSquareError(hypothesis, y) {
  const num_training = y.size()[0];
  const error = subtract(hypothesis, y);
  const costJ = (1 / (2 * num_training)) * sum(dotPow(error, 2));
  return costJ;
}

// the same as `meanSquareError()` but less performant
export function nonVectorizedMSE(y_hat, y) {
  if (y.length != y_hat.length) {
    throw new Error(
      "length of predicted values doesnt match output values length"
    );
  }
  let error = 0;
  for (let i = 0; i < y.length; i++) {
    const diff = y_hat[i] - y[i];
    error += diff * diff;
  }
  return error / (2 * y.length);
}
