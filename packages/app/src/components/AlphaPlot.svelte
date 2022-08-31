<script>
  import { sparse, transpose, ones, matrix, min } from "mathjs";
  import gradientDescent, {
    nonVectorizedGradientDescent,
  } from "../utils/gradient_descent";
  import { onMount } from "svelte";
  import Plotly from "plotly.js-dist-min";
  import { hypothesis } from "../utils/hypothesis";

  // y = 2x + 5
  const xs = [0, 1, 2, 3, 4, 5];
  const points = Array.from(xs, (x) => 2 * x + 5);

  const X = transpose(matrix([ones(xs.length), xs]));
  const Y = sparse(points);
  const theta = sparse([0, 0]);
  let alphas = [0.01, 0.05, 0.1, 0.2, 0.25];
  let selectedAlpha = 0.01;
  let num_iterations = 5;

  function updateAnim() {
    const frames = [createData(selectedAlpha, X, theta, Y, num_iterations)];
    Plotly.animate("alpha_plot", frames);
  }

  function createData(alpha, X, theta, Y, iters) {
    const { Jerror } = gradientDescent(X, Y, theta, alpha, iters);

    const xVals = Array.from(Array(Jerror.length).keys());
    // update axis
    const minX = Math.min(...xVals);
    const maxX = Math.max(...xVals);

    const minY = Math.min(...Jerror);
    const maxY = Math.max(...Jerror);

    return {
      data: [{ x: xVals, y: Jerror }],
      layout: {
        xaxis: { range: [minX, maxX] },
        yaxis: { range: [minY, maxY] },
      },
    };
  }

  const frames = [
    { name: "0.01", ...createData(0.01, X, theta, Y, num_iterations) },
    { name: "0.05", ...createData(0.05, X, theta, Y, num_iterations) },
    { name: "0.1", ...createData(0.1, X, theta, Y, num_iterations) },
    { name: "0.2", ...createData(0.2, X, theta, Y, num_iterations) },
    { name: "0.25", ...createData(0.25, X, theta, Y, num_iterations) },
  ];

  const { t, Jerror, thetaHistory } = gradientDescent(
    X,
    Y,
    theta,
    selectedAlpha,
    num_iterations
  );
  console.log("Jerr: ", Jerror);
  console.log("thetaHistory: ", thetaHistory);

  const initialFrameData = createData(0.01, X, theta, Y, num_iterations);

  const data = {
    type: "scatter",
    x: initialFrameData.data[0].x,
    y: initialFrameData.data[0].y,
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

  onMount(() => {
    // plot hypothesis vs y-values
    Plotly.newPlot("points_plot", [
      { type: "scatter", y: points, name: "y" },
      { type: "scatter", y: hyp._values, name: "hypothesis" },
    ]);

    // plot learning with different alphas
    Plotly.newPlot("alpha_plot", [data], {
      updatemenus: [
        {
          buttons: [
            { method: "animate", args: [["0.01"]], label: "0.01" },
            { method: "animate", args: [["0.05"]], label: "0.05" },
            { method: "animate", args: [["0.1"]], label: "0.1" },
            { method: "animate", args: [["0.2"]], label: "0.2" },
            { method: "animate", args: [["0.25"]], label: "0.25" },
          ],
        },
      ],
    }).then(function () {
      console.log("here");
      Plotly.addFrames("alpha_plot", frames);
    });
    // plot theta values against error
    Plotly.newPlot("test", [testData1, testData2]);
  });
</script>

<div id="points_plot" />
<div id="controls">
  <input
    bind:value={num_iterations}
    on:change={updateAnim}
    type="range"
    min="5"
    max="30"
  />
  <!-- TODO: dropdown -->
  <div>
    {#each alphas as alpha}
      <label>
        <input
          type="radio"
          bind:group={selectedAlpha}
          value={alpha}
          on:click={updateAnim}
        />
        {alpha}
        <br />
      </label>
    {/each}
    <p>{selectedAlpha}</p>
  </div>
</div>
<div id="alpha_plot" />
<div id="test" />
