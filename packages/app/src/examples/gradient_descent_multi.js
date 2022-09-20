import { matrix, sparse, zeros } from "mathjs";
import { omit } from "../utils/omit";
import gradientDescent from "../utils/gradient_descent";
import plotLearningGraph from "../plot_learning_graph";
import featureNormalization from "../utils/feature_normalize";

const LEARNING_RATE = 0.01;

export function createFeatures(data, yName) {
  let X = matrix(
    data.map((d) => {
      // making sure to omit the y labels to prevent information leak
      let matrixData = omit(d, yName);
      // 'No' is the id of the data - not important so remove
      matrixData = omit(matrixData, "No");
      let props = Object.values(matrixData);
      props = props.map((p) => parseFloat(p));
      return props;
    })
  );
  // normalize features to get features in similar range to speed up convergence
  const { x_norm } = featureNormalization(X);

  // add the column of 1's aka bias
  X = matrix(
    x_norm.toArray().map((m) => {
      let result = Object.values(m);
      result.unshift(1);
      return result;
    })
  );
  return X;
}

export default function gradientDescentMultiExample(
  data,
  alpha = LEARNING_RATE,
  iters = 100
) {
  const yName = "Y house price of unit area";
  const y = sparse(data.map((d) => d[yName]));

  const X = createFeatures(data, yName);
  const theta = zeros(X.size()[1], 1);

  return gradientDescent(X, y, theta, alpha, iters);
}
