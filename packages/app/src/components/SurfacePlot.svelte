<script>
  import { onMount } from "svelte";
  import Plotly from "plotly.js-dist-min";
  import { sparse, transpose, matrix, ones } from "mathjs";
  import { hypothesis } from "../utils/hypothesis";
  import meanSquareError from "../utils/mse";

  // y = 2x + 5
  const xs = [0, 1, 2, 3, 4, 5];
  const points = Array.from(xs, (x) => (x, 2 * x + 5));

  const X = transpose(matrix([ones(xs.length), xs]));
  const Y = sparse(points);

  // compute the grid of errors -> c = [0,...5], m = [0,...5], z = Jerr()
  // z would be the error of J(θ_0, θ_1)
  // x = different θ_0 vals (θ_0 = m)
  // y = different θ_1 vals (θ_1 = c)
  const z = [];
  for (let i = 0; i < 5; i++) {
    let zz = [];
    for (let j = 0; j < 5; j++) {
      const t = sparse([i, j]);
      const hyp = hypothesis(X, t);
      const Jerr = meanSquareError(hyp, Y);
      zz.push(Jerr);
    }
    z.push(zz);
  }

  const layout = {
    title: "Surface plot of error",
    autosize: false,
    width: 500,
    height: 500,
    margin: {
      l: 65,
      r: 50,
      b: 65,
      t: 90,
    },
  };

  const data = [
    {
      z: z,
      type: "surface",
    },
  ];

  onMount(() => {
    Plotly.newPlot("surface_plot", data, layout);
  });
</script>

<div id="surface_plot" />
