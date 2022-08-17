import "./style.css";
import {
  matrix,
  zeros,
  ones,
  transpose,
  sparse,
  subset,
  index,
  range,
} from "mathjs";
import plotScatterDiagram from "./src/plot_scatter";
import gradientDescent from "./utils/gradient_descent";
import plotLearningGraph from "./src/plot_learning_graph";
import { omit } from "./utils/omit";
import computeCost from "./utils/compute_cost";
import testData from "../../data/testdata.json";

import Plotly from "plotly.js-dist-min";

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

  // example of contour plot
  const theta0s = range(-10, 10, 0.2, true);
  const theta1s = range(-1, 4, 0.0505, true);

  let Jvals = zeros(theta0s.size()[0], theta1s.size()[0]);

  const num_training = testData.length;
  X = matrix([ones(num_training), testData.map((d) => d.X)]);
  X = transpose(X);

  const newY = matrix(
    testData.map((td) => td.Y),
    "sparse"
  );

  for (let i = 0; i < theta0s.size()[0]; i++) {
    for (let j = 0; j < theta1s.size()[0]; j++) {
      const theta = sparse([theta0s._data[i], theta1s._data[j]]);
      const err = computeCost(X, newY, theta);
      Jvals = subset(Jvals, index(i, j), err);
    }
  }

  const contourData = [
    {
      z: transpose(Jvals).toArray(),
      x: theta0s.toArray(),
      y: theta1s.toArray(),
      type: "contour",
      colorscale: "Jet",
      connectgaps: true,
      // dx: 5,
      // x0: -10,
      // dy: 0.5,
      // y0: -1,
      contours: {
        // coloring: "lines",
        start: 0,
        end: 800,
        size: 10,
        showlabels: false,
        labelfont: {
          family: "Raleway",
          size: 12,
          color: "white",
        },
      },
    },
  ];

  console.log("contour data: ", contourData);

  const layout = {
    title: "J(theta0, theta1)",
    xaxis: {
      // type: "log",
      // autorange: true,
    },
    yaxis: {
      // type: "log",
      // autorange: true,
    },
  };

  Plotly.newPlot("contour_plot", contourData, layout);
}

await main();
