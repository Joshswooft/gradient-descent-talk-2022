import "./style.css";
import plotScatterDiagram from "./src/plot_scatter";
import contourPlotExample from "./src/examples/contour_plot";
import gradientDescentMultiExample from "./src/examples/gradient_descent_multi";

document.querySelector("#app").innerHTML = `
  <h1>Linear Regression on housing data</h1>
`;

async function main() {
  // TODO: move endpoint to .env
  const jsonUrl = "http://localhost:8080/data";
  await plotScatterDiagram("scatter_plot", jsonUrl);

  gradientDescentMultiExample();

  contourPlotExample("contour_plot_ex1");
}

await main();
