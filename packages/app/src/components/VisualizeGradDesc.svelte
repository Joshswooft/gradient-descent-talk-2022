<script lang="ts">
  import Grid from "./Grid.svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import * as d3 from "https://cdn.skypack.dev/d3@7";

  //   y = (x - 20)^2 + c
  const y = (x, c) => (x - 20) * (x - 20) + c;

  //   2(x - 20)
  const dy = (x) => 2 * (x - 20);

  const c = 1000;

  let width = 500,
    height = 500;

  const xScale = d3.scaleLinear().domain([-30, 30]).range([0, width]);
  const yScale = d3
    .scaleLinear()
    .domain([y(-30, c), y(30, c)])
    .range([0, height]);

  const startX = xScale(-30);
  const startY = yScale(y(-30, c));

  const time = tweened(startX);
  const value = tweened(startY);

  function reset() {
    value.set(startY, { duration: 0 });
    time.set(startX, { duration: 0 });
    iterations = 0;
  }

  // TODO: plot the curved line on the graph

  const data = [
    { x: -30, y: y(-30, c) },
    { x: -20, y: y(-20, c) },
    { x: -10, y: y(-10, c) },
    { x: 0, y: y(0, c) },
    { x: 10, y: y(10, c) },
    { x: 20, y: y(20, c) },
    { x: 30, y: y(30, c) },
  ];

  console.log("width: ", width);
  console.log("height: ", height);

  $: line_gen = d3
    .line()
    .curve(d3.curveNatural)
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))(data);

  console.log("line: ", line_gen);

  function interpolate(a: number, b: number): (t: number) => number {
    return (t: number) => a * (1 - t) + b * t;
  }

  let iterations = 0;

  async function runAnimation() {
    console.log("run!");

    // kind of a hacky way of animating as it goes through each point in time and draws straight line
    while (iterations < data.length) {
      const d = data[iterations];
      await Promise.all([
        value.set(yScale(d.y), {
          duration: 200,
          interpolate: interpolate,
          // easing: cubicOut,
        }),
        time.set(xScale(d.x), {
          duration: 200,
          interpolate: interpolate,
          // easing: cubicOut,
        }),
      ]);
      iterations++;
    }

    // await Promise.all(
    //   data.map((d) => [
    //     // https://svelte.dev/tutorial/tweened
    //     //   TODO: create the correct movement animation
    //     value.set(yScale(d.y), {
    //       duration: 4000,
    //       interpolate: interpolate,
    //       // easing: cubicOut,
    //     }),
    //     time.set(xScale(d.x), {
    //       duration: 4000,
    //       interpolate: interpolate,
    //       // easing: cubicOut,
    //     }),
    //   ])
    // );
  }

  runAnimation();

  function playFromStart() {
    reset();
    runAnimation();
  }
</script>

<div>
  <button on:click={playFromStart}>Run</button>
  <svg viewBox="0 0 1400 1802" class="svg-grid" {width} {height}>
    <g class="canvas">
      <Grid x={$time} y={$value} />
      <g class="graph">
        <!-- 	the lil arrow icon that moves up			 -->
        <path
          d="M0,23.647C0,22.41 27.014,0.407 28.496,0.025C29.978,-0.357 69.188,3.744 70.104,4.744C71.02,5.745 71.02,41.499 70.104,42.5C69.188,43.501 29.978,47.601 28.496,47.219C27.014,46.837 0,24.884 0,23.647Z"
          fill="#ff3e00"
          style="transform: translate(1200px, {$value - 24}px)"
        />
        <circle cx={$time} cy={$value} r="15" fill="#ff3e00" />
        <path d={line_gen} stroke="blue" stroke-width="5" fill="none" />
      </g>
    </g>
  </svg>
</div>

<style>
  .svg-grid {
    display: inline-block;
    width: 500px;
    height: 500px;
  }
  .graph {
    /* this is needed to move the circle to the point where the red lines intersect */
    transform: translate(200px, 400px);
  }
</style>
