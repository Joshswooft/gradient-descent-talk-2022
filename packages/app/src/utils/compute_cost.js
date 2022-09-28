import meanSquareError from "./mse";
import { multiply } from "mathjs";
import { hypothesis } from "./hypothesis";

export default function computeCost(X, y, theta, costFn = meanSquareError) {
  const h = hypothesis(X, theta);

  return costFn(h, y);
}
