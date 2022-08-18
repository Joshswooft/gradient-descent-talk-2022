import { matrix, sparse, zeros } from "mathjs";
import { omit } from "../utils/omit";
import gradientDescent from "../utils/gradient_descent";
import plotLearningGraph from "../plot_learning_graph";
import featureNormalization from "../utils/feature_normalize";

export default async function gradientDescentMultiExample() {
  const LEARNING_RATE = 0.01;
  const jsonUrl = "http://localhost:8080/data";
  const response = await fetch(jsonUrl);

  const data = await response.json();
  console.log("data json: ", data);
  const featureName = "X2 house age";
  const yName = "Y house price of unit area";

  let X = matrix(
    data.map((d) => {
      // making sure to omit the y labels to prevent information leak
      let matrixData = omit(d, yName);
      // 'No' is the id of the data - unimportant so remove
      matrixData = omit(d, "No");
      let props = Object.values(matrixData);
      props = props.map((p) => parseFloat(p));
      return props;
    })
  );

  const y = sparse(data.map((d) => d[yName]));

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
  console.log("X_norm: ", X);

  const theta = zeros(X.size()[1], 1);

  let { _, Jerror } = gradientDescent(X, y, theta, LEARNING_RATE, 100);

  plotLearningGraph("learning_plot", Jerror);
}
