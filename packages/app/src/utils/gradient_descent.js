import { multiply, subtract, transpose, divide, sparse } from "mathjs";
import computeCost from "./compute_cost";
import { hypothesis } from "./hypothesis";
import meanSquareError from "./mse";
import { nonVectorizedMSE } from "./mse";

// X = matrix of inputs
// y = matrix of outputs
// theta = matrix of params
// alpha = learning rate
export default function gradientDescent(
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

  const num_training = y.size()[0];

  let Jerror = [];

  let t = theta;

  let thetaHistory = [t];

  for (let i = 0; i < num_iters; i++) {
    const hyp = hypothesis(X, t);
    const error = subtract(hyp, y);
    const E = multiply(transpose(X), error);

    t = subtract(t, multiply(divide(alpha, num_training), E));
    // save the cost (degree of error) of each iteration - useful for plotting
    // the cost should decrease per iteration
    Jerror.push(computeCost(X, y, t, costFn));
    thetaHistory.push(t);
  }

  return { t, Jerror, thetaHistory };
}

// non-vectorized
// TODO: make this work for multi-variables
export function nonVectorizedGradientDescent(X, y, theta, alpha, num_iters) {
  let JError = [];
  let thetaHistory = [];

  // repeat until convergence
  for (let iters = 0; iters < num_iters; iters++) {
    const hypothesis = (x) => theta[0] + theta[1] * x;
    const y_pred = X.map((x) => hypothesis(x, theta));
    const cost = nonVectorizedMSE(y_pred, y);

    JError.push(cost);

    let tempTheta0 = 0;
    let tempTheta1 = 0;
    // calculate errors for each theta
    for (let j = 0; j < theta.length; j++) {
      let errors = [];
      let error = 0;
      if (j == 0) {
        // error = mean( h(x) - y )
        errors = y.map((yi, i) => y_pred[i] - yi);
        const total = errors.reduce(function (sum, value) {
          return sum + value;
        }, 0);
        error = total / y.length;
        tempTheta0 = theta[j] - alpha * error;
        theta[j] = tempTheta0;
        continue;
      }

      errors = y.map((yi, i) => (y_pred[i] - yi) * X[i]);
      const total = errors.reduce(function (sum, value) {
        return sum + value;
      }, 0);
      error = total / y.length;
      tempTheta1 = theta[j] - alpha * error;
      theta[j] = tempTheta1;
    }
    thetaHistory.push([tempTheta0, tempTheta1]);
  }

  return { theta, JError, thetaHistory };
}
