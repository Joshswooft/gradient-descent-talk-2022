import meanSquareError from "./mse";
import math from "mathjs";

export default function computeCost(X, y, theta, costFn = meanSquareError) {
  // h is our hypothesis i.e. predicted y value
  const h = math.multiply(X, theta);
  return costFn(h, y);
}
