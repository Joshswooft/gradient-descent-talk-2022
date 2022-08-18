import {
  zeros,
  matrix,
  transpose,
  sparse,
  subset,
  range,
  ones,
  index,
} from "mathjs";
import computeCost from "../utils/compute_cost";
import Plotly from "plotly.js-dist-min";
import testData from "../../../../data/testdata.json";

export default function contourPlotExample(id) {
  // example of contour plot
  const theta0s = range(-10, 10, 0.2, true);
  const theta1s = range(-1, 4, 0.0505, true);

  let Jvals = zeros(theta0s.size()[0], theta1s.size()[0]);

  const num_training = testData.length;
  let X = matrix([ones(num_training), testData.map((d) => d.X)]);
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

  Plotly.newPlot(id, contourData, layout);
}
