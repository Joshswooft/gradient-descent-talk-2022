import "./style.css";
import { matrix, zeros, sparse } from "mathjs";
import plotScatterDiagram from "./src/plot_scatter";
import gradientDescent from "./src/utils/gradient_descent";
import plotLearningGraph from "./src/plot_learning_graph";
import { omit } from "./src/utils/omit";
import contourPlotExample from "./src/examples/contour_plot";

document.querySelector("#app").innerHTML = `
  <h1>Linear Regression on housing data</h1>
`;

const LEARNING_RATE = 0.00000001;

async function main() {
  // TODO: move endpoint to .env
  const jsonUrl = "http://localhost:8080/data";
  await plotScatterDiagram("scatter_plot", jsonUrl);

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

  contourPlotExample("contour_plot_ex1");
}

await main();
