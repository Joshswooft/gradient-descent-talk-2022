<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { Parallax, ParallaxLayer, StickyLayer } from "svelte-parallax";
  import { fade, fly } from "svelte/transition";
  import { sineOut } from "svelte/easing";

  // TODO: asset/static folder?
  import PexelLight from "./pexel-light.png";

  // import plotScatterDiagram from "../plot_scatter";
  // import contourPlotExample from "../examples/contour_plot";
  // import gradientDescentMultiExample from "../examples/gradient_descent_multi";
  import { link } from "svelte-spa-router";

  onMount(async () => {
    // const jsonUrl = "http://localhost:8080/data";
    // await plotScatterDiagram("scatter_plot", jsonUrl);
    // gradientDescentMultiExample();
    // contourPlotExample("contour_plot_ex1");
  });

  let parallax;
  const parallaxConfig = { stiffness: 0.2, damping: 0.3 };

  let bgImage = `background-image: url("${PexelLight}")`;
</script>

<main>
  <Parallax sections={3} config={parallaxConfig} bind:this={parallax}>
    <ParallaxLayer rate={0} span={1}>
      <div class={"flex justify-center items-center h-full"}>
        <div>
          <span id="sub-title"
            >A Maths introduction to Machine Learning - Part 1</span
          >
          <h1>Linear Regression</h1>
          <nav class="my-5">
            <a href="/basics" use:link>Learn the basics</a>
            <a href="/costfunction/" use:link>Mean Square Error</a>
            <a href="/gradientdescent/" use:link>Gradient Descent</a>
          </nav>
        </div>
        <button
          class={"absolute bottom-5"}
          in:fly
          on:click={() =>
            parallax.scrollTo(4, {
              selector: ".why-maths",
              duration: 6000,
              easing: sineOut,
            })}>Click me</button
        >
      </div>
    </ParallaxLayer>
    <ParallaxLayer
      rate={0.15}
      offset={1}
      span={1}
      let:progress
      style={"overflow: hidden"}
    >
      <img
        alt="bla"
        src={PexelLight}
        style={`transform: scale3d(${5 - progress * 5}, ${
          5 - progress * 2
        }, 1); background-repeat: no-repeat; rotate: 90deg; max-width: 100%; max-height: 100%; display: inline-block`}
      />
    </ParallaxLayer>
    <ParallaxLayer offset={2} span={1} rate={0.5} let:progress>
      <div style="opacity: {progress * 3};">
        <h1 class="why-maths mb-16 mt-8 text-white">Why do we need maths?</h1>
        <div class="flex justify-center">
          <ul class="flex gap-8 flex-col text-left list-disc">
            <li>Be able to debug problems easier</li>
            <li>Understand how to tune models for greater performance/speed</li>
            <li>Being able to interpret results</li>
            <li>
              Gain an intuition on more complicated machine learning algorithmns
            </li>
          </ul>
        </div>
      </div>
    </ParallaxLayer>
    <!-- <div id="scatter_plot" />
    <div id="learning_plot" />
    <div id="contour_plot_ex1" /> -->
  </Parallax>
</main>
