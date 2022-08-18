import { matrix, sparse, zeros } from "mathjs";
import { omit } from "../utils/omit";
import gradientDescent from "../utils/gradient_descent";
import plotLearningGraph from "../plot_learning_graph";

export default async function gradientDescentMultiExample() {
  const LEARNING_RATE = 0.00000001;
  const jsonUrl = "http://localhost:8080/data";
  const response = await fetch(jsonUrl);

  const data = await response.json();
  console.log("data json: ", data);
  const featureName = "X2 house age";
  const yName = "Y house price of unit area";

  // add a column of 1's
  let X = matrix(
    data.map((d) => {
      let matrixData = omit(d, yName);
      matrixData = omit(d, "No");
      let props = Object.values(matrixData);
      props.unshift(1);
      props = props.map((p) => parseFloat(p));
      return props;
    })
  );

  const y = sparse(data.map((d) => d[yName]));
  const theta = zeros(X.size()[1], 1);
  let { _, Jerror } = gradientDescent(X, y, theta, LEARNING_RATE, 100);

  plotLearningGraph("learning_plot", Jerror);
}
