<script lang="ts">
  export let shouldPlay: boolean;
  export let reverse: boolean;

  import Grid from "../Grid.svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import * as d3 from "https://cdn.skypack.dev/d3@7";
  import range from "../../utils/range";

  const c = 1000;
  const autoAlpha = "auto";
  $: selectedAlpha = autoAlpha;
  let alphas = [0.01, 0.1, 1, autoAlpha];

  function learn(fx, x: number, learning_rate = 0.01, h = 0.00001, cc = c) {
    const delta = fx(x + h, cc) - fx(x, cc);
    const slope = delta / h;

    return { x: x - slope * learning_rate, slope };
  }

  const equations = {
    cubic: {
      y: (x, c) => -(x * x * x) - 3 * (x * x) + 500 * x + c,
      // - 3x^2 - 6x + 500
      // use quadratic formula to find critical points i.e. where gradient = 0
      // minimum point is at x = -13.949
      // saddle point is at x = 11.949
      dy: (x) => -3 * (x * x) - 6 * x + 500,
      criticalPoints: [-13.949, 11.949],
    },
    convex: {
      //   y = (x - 20)^2 + c
      y: (x, c) => (x - 20) * (x - 20) + c,
      //   2(x - 20)
      dy: (x) => 2 * (x - 20),
      criticalPoints: [20],
    },
  };

  let isPlaying = false;

  $: chosenEq = "convex";
  $: y = equations[chosenEq].y;
  $: dy = equations[chosenEq].dy;

  function setCubic() {
    chosenEq = "cubic";
    reset();
  }

  function setConvex() {
    chosenEq = "convex";
    reset();
  }

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
    isPlaying = false;
  }

  $: data = range(-30, 70, 1).map((x) => ({ x, y: y(x, c) }));

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
    isPlaying = true;
    while (iterations > 0) {
      const d = data[iterations - 1];

      await Promise.all([
        value.set(yScale(d.y), {
          duration: 20,
          interpolate: interpolate,
          // easing: cubicOut,
        }),
        time.set(xScale(d.x), {
          duration: 20,
          interpolate: interpolate,
          // easing: cubicOut,
        }),
      ]);
      iterations--;
    }
    isPlaying = false;
  }

  // run animation with gradient descent
  async function runAnimationWithGD(alpha) {
    isPlaying = true;
    let foundMinimum = false;

    let x = data[iterations].x;

    let iters = 0;

    while (!foundMinimum) {
      const out = learn(equations[chosenEq].y, x, alpha);

      x = out.x;
      const grad = Math.floor(out.slope);
      const yVal = equations[chosenEq].y(x, c);
      // anim step

      await Promise.all([
        value.set(yScale(yVal), {
          duration: 20,
          interpolate: interpolate,
          // easing: cubicOut,
        }),
        time.set(xScale(x), {
          duration: 20,
          interpolate: interpolate,
          // easing: cubicOut,
        }),
      ]);

      if (
        grad == 0 ||
        equations[chosenEq].criticalPoints.some(
          (cx) => Math.round(cx) == Math.round(x)
        ) ||
        iters > 200 ||
        x > 70
      ) {
        foundMinimum = true;
        break;
      }
      iters++;
    }
    isPlaying = false;
  }

  async function moveThroughPoints() {
    isPlaying = true;
    // direction of which way to follow the curve - we follow in direction where y is the least i.e. y is the error we wish to minimize
    let direction = 1;
    if (iterations < data.length && iterations > 0) {
      const y1 = data[iterations - 1].y;
      const y2 = data[iterations].y;

      if (y1 < y2) {
        direction = -1;
      }
    }

    // kind of a hacky way of animating as it goes through each point and draws straight line
    while (iterations < data.length) {
      const d = data[iterations];

      const grad = dy(d.x);

      await Promise.all([
        value.set(yScale(d.y), {
          duration: 20,
          interpolate: interpolate,
          // easing: cubicOut,
        }),
        time.set(xScale(d.x), {
          duration: 20,
          interpolate: interpolate,
          // easing: cubicOut,
        }),
      ]);
      //   found the min point - stop the animation!
      //   note: this only works because we chose our x-values carefully :)
      if (
        grad == 0 ||
        equations[chosenEq].criticalPoints.some((x) => Math.round(x) == d.x)
      ) {
        break;
      }
      iterations += direction;
    }
    isPlaying = false;
  }

  async function runAnimation() {
    if (selectedAlpha === autoAlpha) {
      moveThroughPoints();
      return;
    }
    runAnimationWithGD(selectedAlpha);
  }

  async function setPoint(evt) {
    isPlaying = false;
    const xScaled = +evt.target.value;
    const x = xScale.invert(xScaled);
    const yVal = yScale(y(x, c));

    const index = data.findIndex((d) => d.x == Math.round(x));
    if (index != -1) {
      iterations = index;
    }

    await Promise.all([
      time.set(xScaled, {
        duration: 200,
        interpolate: interpolate,
        // easing: cubicOut,
      }),
      value.set(yVal, {
        duration: 200,
        interpolate: interpolate,
        // easing: cubicOut,
      }),
    ]);
  }

  // this brings reactivity to the component, when the play variable changes this block will execute.
  $: if (shouldPlay && reverse) {
    reverseAnim();
  }

  $: if (shouldPlay && !reverse) {
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
    class="mx-auto mt-8 mb-4 grid grid-cols-2 items-center gap-8"
    style="max-width: 300px;"
  >
    <button
      class:btn-disabled={chosenEq === "convex"}
      class="btn btn-sm btn-outline"
      on:click={setConvex}>convex</button
    >
    <button
      class:btn-disabled={chosenEq === "cubic"}
      class="btn btn-sm btn-outline"
      on:click={setCubic}>cubic</button
    >
    <button
      class:btn-disabled={isPlaying === true}
      class="btn btn-sm btn-outline"
      on:click={runAnimation}>Play</button
    >
    <select bind:value={selectedAlpha} on:change={reset}>
      {#each alphas as alpha}
        <option value={alpha}>
          alpha: {alpha}
        </option>
      {/each}
    </select>
  </div>
  <div>
    <input
      type="range"
      on:change={setPoint}
      min={xScale(-30)}
      max={xScale(70)}
    />
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
