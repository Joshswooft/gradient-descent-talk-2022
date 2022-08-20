<script lang="ts">
  import { onMount } from "svelte";

  import plotScatterDiagram from "../plot_scatter";
  import contourPlotExample from "../examples/contour_plot";
  import gradientDescentMultiExample from "../examples/gradient_descent_multi";
  import { link } from "svelte-spa-router";

  onMount(async () => {
    const jsonUrl = "http://localhost:8080/data";
    await plotScatterDiagram("scatter_plot", jsonUrl);
    gradientDescentMultiExample();
    contourPlotExample("contour_plot_ex1");
  });
</script>

<main>
  <h1>Introduction to Machine Learning</h1>
  <h2>Linear Regression</h2>
  <nav>
    <a href="/basics" use:link>Learn the basics</a>
    <a href="/costfunction/" use:link>Mean Square Error</a>
    <a href="/gradientdescent/" use:link>Gradient Descent</a>
  </nav>
  <div id="scatter_plot" />
  <div id="learning_plot" />
  <div id="contour_plot_ex1" />
</main>
