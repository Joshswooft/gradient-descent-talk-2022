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
  let alpha_plot;

  let gradDescentResult = gradientDescent(
    X,
    Y,
    theta,
    selectedAlpha,
    num_iterations
  );

  console.log("gradDescentResult: ", gradDescentResult);

  $: alpha_plot && updateAnim(selectedAlpha, num_iterations);

  function updateAnim(selectedAlpha, num_iterations) {
    console.log("updating: ", { selectedAlpha, num_iterations });
    const frames = [createData(selectedAlpha, X, theta, Y, num_iterations)];
    Plotly.animate("alpha_plot", frames, { redraw: false });

    const { t, thetaHistory, Jerror } = gradDescentResult;
    const hyp = hypothesis(X, t);

    const data = [
      { y: points, name: "y" },
      { y: hyp._values, name: "hypothesis" },
    ];
    Plotly.animate("points_plot", { data });

    const t0s = thetaHistory.map((t) => t._values[0]);
    const t1s = thetaHistory.map((t) => t._values[1]);

    const minX = Math.min(...t0s, ...t1s);
    const maxX = Math.max(...t0s, ...t1s);

    const minY = 0;
    const maxY = Math.max(...Jerror);

    const testData1 = {
      x: t0s,
      y: Jerror,
    };

    const testData2 = {
      x: t1s,
      y: Jerror,
    };

    // TODO: is there a way to mark the begining and end markers?

    Plotly.animate("test", {
      data: [testData1, testData2],
      layout: {
        xaxis: { range: [minX, maxX] },
        yaxis: { range: [minY, maxY] },
      },
    });
  }

  function createData(alpha, X, theta, Y, iters) {
    gradDescentResult = gradientDescent(X, Y, theta, alpha, iters);

    const { Jerror } = gradDescentResult;

    const xVals = Array.from(Array(Jerror.length).keys());
    // update axis
    const minX = 0;
    const maxX = num_iterations;

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

  const { t, Jerror, thetaHistory } = gradDescentResult;
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
    Plotly.newPlot("alpha_plot", [data]);
    // plot theta values against error
    Plotly.newPlot("test", [testData1, testData2]);
  });
</script>

<div class="grid grid-cols-2">
  <div id="controls">
    <label for="iters_slider">Number of iterations</label>
    <input
      id="iters_slider"
      bind:value={num_iterations}
      type="range"
      min="2"
      max="50"
    />
    <select bind:value={selectedAlpha}>
      {#each alphas as alpha}
        <option value={alpha}>
          alpha: {alpha}
        </option>
      {/each}
    </select>
  </div>
  <div id="points_plot" style="min-height: 300px;" />
  <div bind:this={alpha_plot} id="alpha_plot" />
  <div id="test" />
</div>
