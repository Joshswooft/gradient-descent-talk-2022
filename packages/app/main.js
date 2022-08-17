import "./style.css";
import { matrix, zeros, ones, transpose, sparse, apply } from "mathjs";
import plotScatterDiagram from "./src/plot_scatter";
import contourPlot from "./src/contour_plot";
import gradientDescent from "./utils/gradient_descent";
import plotLearningGraph from "./src/plot_learning_graph";
import { omit } from "./utils/omit";

document.querySelector("#app").innerHTML = `
  <h1>Linear Regression on housing data</h1>
`;

const LEARNING_RATE = 0.00000001;

async function main() {
  const canvas = document.getElementById("canvas");

  if (!canvas.getContext) {
    return;
  }

  const w = canvas.clientWidth;
  const h = canvas.clientHeight;

  console.log("w: ", w);
  console.log("H: ", h);

  // get the context
  let ctx = canvas.getContext("2d");

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

  console.log(X);

  // wasn't sure how to add the column so we make it a row then transpose to get correct shape
  const y = sparse(data.map((d) => d[yName]));

  console.log("X size: ", X.size());
  const theta = zeros(X.size()[1], 1);

  console.log("X: ", X);
  console.log("Y: ", y);
  console.log("theta: ", theta);
  let { t, Jerror } = gradientDescent(X, y, theta, LEARNING_RATE, 100);

  console.log("t ", t);
  console.log("JErr", Jerror);

  plotLearningGraph(Jerror);

  // contourPlot("contour_plot", data);
}

await main();
