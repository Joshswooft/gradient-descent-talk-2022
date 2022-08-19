import "./style.css";
import plotScatterDiagram from "./src/plot_scatter";
import contourPlotExample from "./src/examples/contour_plot";
import gradientDescentMultiExample from "./src/examples/gradient_descent_multi";
import { init } from "mathjax";

document.querySelector("#app").innerHTML = `
  <h1>Introduction to Machine Learning</h1>
  <h2>Linear Regression</h2>
  <a href="/basics/">Learn the basics</a>
  <a href="/costfunction/">Mean Square Error</a>
  <a href="/gradientdescent/">Gradient Descent</a>
  <div id="scatter_plot"></div>
  <div id="learning_plot"></div>
  <div id="contour_plot_ex1"></div>
`;

init();

async function main() {
  // TODO: move endpoint to .env
  // const jsonUrl = "http://localhost:8080/data";
  // await plotScatterDiagram("scatter_plot", jsonUrl);
  // gradientDescentMultiExample();
  // contourPlotExample("contour_plot_ex1");
}

await main();
