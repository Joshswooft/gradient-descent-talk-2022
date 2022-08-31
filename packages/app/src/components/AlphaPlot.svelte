<script>
  import { sparse, transpose, ones, matrix } from "mathjs";
  import gradientDescent, {
    nonVectorizedGradientDescent,
  } from "../utils/gradient_descent";
  import { onMount } from "svelte";
  import Plotly from "plotly.js-dist-min";
  import { hypothesis } from "../utils/hypothesis";

  // y = 2x + 5
  const xs = [0, 1, 2, 3, 4, 5];
  const points = Array.from(xs, (x) => (x, 2 * x + 5));

  const X = transpose(matrix([ones(xs.length), xs]));
  const Y = sparse(points);
  const theta = sparse([0, 0]);
  const alpha = 0.01;

  const { t, Jerror, thetaHistory } = gradientDescent(X, Y, theta, alpha, 5);
  console.log("Jerr: ", Jerror);
  console.log("thetaHistory: ", thetaHistory);

  const data = {
    type: "scatter",
    x: Array.from(Array(Jerror.length).keys()),
    y: Jerror,
  };

  const testData1 = {
    type: "scatter",
    x: thetaHistory.map((t) => t._values[0]),
    y: Jerror,
    name: "Theta 0",
    line: {
      color: "rgb(219, 64, 82)",
      width: 3,
    },
  };

  const testData2 = {
    type: "scatter",
    x: thetaHistory.map((t) => t._values[1]),
    y: Jerror,
    name: "Theta 1",
    line: {
      color: "blue",
      width: 3,
    },
  };

  const hyp = hypothesis(X, t);
  console.log("hyp: ", hyp);

  const results = nonVectorizedGradientDescent(xs, points, [0, 0], 0.1, 5);
  console.log("resultsL ", results);

  onMount(() => {
    Plotly.newPlot("points_plot", [
      { type: "scatter", y: points, name: "y" },
      { type: "scatter", y: hyp._values, name: "hypothesis" },
    ]);
    Plotly.newPlot("alpha_plot", [data]);
    Plotly.newPlot("test", [testData1, testData2]);
  });
</script>

<div id="points_plot" />
<div id="alpha_plot" />
<div id="test" />
