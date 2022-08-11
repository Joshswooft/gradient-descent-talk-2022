import math from "mathjs";
import computeCost from "./compute_cost";
import meanSquareError from "./mse";

// X = matrix of inputs
// y = matrix of outputs
// theta = matrix of params
// alpha = learning rate
export default function gradient_descent(
  X,
  y,
  theta,
  alpha = 0.1,
  num_iters = 1000,
  costFn = meanSquareError
) {
  // Performs gradient descent to 'learn' the values of the params ('theta')
  // It updates theta by taking 'num_iters' steps with learning rate 'alpha'
  // optimise the cost function in this case MSE

  const num_training = y.length;

  let Jerror = [];

  let t = theta;

  for (let i = 0; i < num_iters; i++) {
    const pred_Y = math.multiply(X, theta);
    const error = math.subtract(pred_Y, y);
    const E = math.multiply(math.transpose(X), error);

    t = math.subtract(t, math.multiply(math.divide(alpha, num_training), E));
    // save the cost (degree of error) of each iteration - useful for plotting
    // the cost should decrease per iteration
    Jerror.push(computeCost(X, y, t, costFn));
  }

  return t, Jerror;
}
