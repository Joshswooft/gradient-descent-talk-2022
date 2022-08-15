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
