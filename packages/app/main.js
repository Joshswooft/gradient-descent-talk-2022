import "./style.css";
import { matrix, zeros, ones, transpose, sparse } from "mathjs";
import plotScatterDiagram from "./src/plot_scatter";
import contourPlot from "./src/contour_plot";
import gradientDescent from "./utils/gradient_descent";
import plotLearningGraph from "./src/plot_learning_graph";

document.querySelector("#app").innerHTML = `
  <h1>Linear Regression on housing data</h1>
`;

const LEARNING_RATE = 0.001;

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
  // await plotScatterDiagram("scatter_plot", jsonUrl);

  const response = await fetch(jsonUrl);

  const data = await response.json();
  const featureName = "X2 house age";
  const yName = "Y house price of unit area";

  const num_training = data.length;
  // add a column of 1's
  let X = matrix([ones(num_training), data.map((d) => d[featureName])]);
  // wasn't sure how to add the column so we make it a row then transpose to get correct shape
  X = transpose(X);
  const y = sparse(data.map((d) => d[yName]));

  const theta = zeros(2, 1);

  console.log("X: ", X);
  console.log("Y: ", y);
  console.log("theta: ", theta);
  let { t, Jerror } = gradientDescent(X, y, theta, LEARNING_RATE, 15000);

  console.log("t ", t);
  console.log("JErr", Jerror);

  plotLearningGraph(Jerror);

  // contourPlot("contour_plot", data);
}

await main();
