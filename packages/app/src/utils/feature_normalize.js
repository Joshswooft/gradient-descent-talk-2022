import { dotDivide, mean, std, subtract, zeros } from "mathjs";

export default function featureNormalization(X) {
  let mu = mean(X);
  let s = std(X);

  let x_norm = dotDivide(subtract(X, mu), s);

  return { x_norm, mean: mu, std_dev: s };
}
