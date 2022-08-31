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

  console.log("y size: ", y.size());
  const num_training = y.size()[0];

  let Jerror = [];

  let t = theta;

  let thetaHistory = [t];

  for (let i = 0; i < num_iters; i++) {
    // console.log("X size: ", X.size());
    // console.log("t size: ", t.size());
    // hypothesis needs to be 414x1
    // const hypothesis = multiply(transpose(X), theta);
    const hyp = hypothesis(X, t);
    // console.log(`hypothesis(${i}): ${hyp}`);

    const error = subtract(hyp, y);
    // console.log("error matrix: ", error);
    const E = multiply(transpose(X), error);

    t = subtract(t, multiply(divide(alpha, num_training), E));
    // save the cost (degree of error) of each iteration - useful for plotting
    // the cost should decrease per iteration
    // console.log("t: ", t);
    Jerror.push(computeCost(X, y, t, costFn));
    thetaHistory.push(t);
  }

  // console.log("return t: ", t);

  return { t, Jerror, thetaHistory };
}

// non-vectorized
// TODO: make this work for multi-variables
export function nonVectorizedGradientDescent(X, y, theta, alpha, num_iters) {
  // hx = theta_0 + theta_1 * x_1 + theta_2 * x_2 + ...
  // note: x_0 = 1
  // const hypothesis = (X, theta) => {
  //   const y_pred = [];
  //   X.map((x, i) => {
  //     if (i == 0) {
  //       y_pred.push(theta[i]);
  //     } else {
  //       y_pred.push(theta[i] * x);
  //     }
  //   });
  //   return y_pred.reduce(function (sum, value) {
  //     return sum + value;
  //   }, 0);
  // };

  let JError = [];

  let thetaHistory = [];

  for (let iters = 0; iters < num_iters; iters++) {
    const hypothesis = (x) => theta[0] + theta[1] * x;

    const y_pred = X.map((x) => hypothesis(x, theta));
    console.log("hypothesis: ", y_pred);
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
        console.log("update theta0 to: ", tempTheta0);
        theta[j] = tempTheta0;
        console.log("theta[j]: ", tempTheta0);
        continue;
      }

      errors = y.map((yi, i) => (y_pred[i] - yi) * X[i]);
      const total = errors.reduce(function (sum, value) {
        return sum + value;
      }, 0);
      error = total / y.length;
      tempTheta1 = theta[j] - alpha * error;
      console.log(`update Theta[${j}] to: ${tempTheta1}`);
      theta[j] = tempTheta1;
    }
    thetaHistory.push([tempTheta0, tempTheta1]);
  }

  console.log("JerrorL ", JError);
  return { theta, JError, thetaHistory };
}
