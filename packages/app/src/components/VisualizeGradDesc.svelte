<script lang="ts">
  export let play: boolean;
  export let reverse: boolean;

  import Grid from "./Grid.svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import * as d3 from "https://cdn.skypack.dev/d3@7";

  //   y = (x - 20)^2 + c
  const convexY = (x, c) => (x - 20) * (x - 20) + c;
  const cubicY = (x, c) => ((0.15 * x) ^ 3) + c;

  $: y = (x, c) => (x - 20) * (x - 20) + c;

  function setCubic() {
    y = cubicY;
    reset();
  }

  function setConvex() {
    y = convexY;
    reset();
  }

  //   2(x - 20)
  const dy = (x) => 2 * (x - 20);

  const c = 1000;

  let width = 500,
    height = 500;

  const xScale = d3.scaleLinear().domain([-30, 30]).range([0, width]);
  $: yScale = d3
    .scaleLinear()
    .domain([y(-30, c), y(30, c)])
    .range([0, height]);

  const startX = xScale(-30);
  $: startY = yScale(y(-30, c));

  const time = tweened(startX);
  $: value = tweened(startY);

  function reset() {
    value.set(startY, { duration: 0 });
    time.set(startX, { duration: 0 });
    iterations = 0;
  }

  $: data = [
    { x: -30, y: y(-30, c) },
    { x: -20, y: y(-20, c) },
    { x: -10, y: y(-10, c) },
    { x: 0, y: y(0, c) },
    { x: 10, y: y(10, c) },
    { x: 20, y: y(20, c) },
    { x: 30, y: y(30, c) },
    { x: 40, y: y(40, c) },
    { x: 50, y: y(50, c) },
    { x: 60, y: y(60, c) },
    { x: 70, y: y(70, c) },
  ];

  console.log("width: ", width);
  console.log("height: ", height);

  $: line_gen = d3
    .line()
    .curve(d3.curveNatural)
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))(data);

  function interpolate(a: number, b: number): (t: number) => number {
    return (t: number) => a * (1 - t) + b * t;
  }

  let iterations = 0;

  async function reverseAnim() {
    while (iterations > 0) {
      const d = data[iterations - 1];

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
      iterations--;
    }
  }

  async function runAnimation() {
    console.log("run!");

    // kind of a hacky way of animating as it goes through each point and draws straight line
    while (iterations < data.length) {
      const d = data[iterations];

      const grad = dy(d.x);

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
      //   found the min point - stop the animation!
      //   note: this only works because we chose our x-values carefully :)
      if (grad == 0) {
        break;
      }
      iterations++;
    }
  }

  function playFromStart() {
    reset();
    runAnimation();
  }

  // this brings reactivity to the component, when the play variable changes this block will execute.
  $: if (play && reverse) {
    reverseAnim();
  }

  $: if (play && !reverse) {
    runAnimation();
  }
</script>

<div class="my-4 text-center">
  <svg viewBox="0 0 1000 1200" class="svg-grid" {width} {height}>
    <g class="canvas">
      <Grid x={$time} y={$value} />
      <g class="graph">
        <!-- 	the lil arrow icon that moves up			 -->
        <path
          d="M0,23.647C0,22.41 27.014,0.407 28.496,0.025C29.978,-0.357 69.188,3.744 70.104,4.744C71.02,5.745 71.02,41.499 70.104,42.5C69.188,43.501 29.978,47.601 28.496,47.219C27.014,46.837 0,24.884 0,23.647Z"
          fill="#ff3e00"
          style="transform: translate(1000px, {$value - 24}px)"
        />
        <circle cx={$time} cy={$value} r="15" fill="#ff3e00" />
        <path d={line_gen} stroke="blue" stroke-width="5" fill="none" />
      </g>
    </g>
  </svg>
  <div
    class="mx-auto mt-8 grid grid-cols-2 items-center gap-8"
    style="max-width: 200px;"
  >
    <button class="btn" on:click={setCubic}>cubic</button>
    <button class="btn" on:click={setConvex}>convex</button>
  </div>
</div>

<style>
  .svg-grid {
    display: inline-block;
    width: 500px;
    height: 300px;
    margin-top: 2em;
  }
  .graph {
    /* this is needed to move the circle to the point where the red lines intersect */
    transform: translate(200px, 400px);
  }
</style>
