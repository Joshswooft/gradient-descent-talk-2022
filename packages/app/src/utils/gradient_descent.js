import { multiply, subtract, transpose, divide, sparse } from "mathjs";
import computeCost from "./compute_cost";
import { hypothesis } from "./hypothesis";
import meanSquareError from "./mse";

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
    // console.log("hypothesis: ", hyp);

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
