<script>
  import {
    simpleLinearRegression,
    multiVariableLinearRegression,
  } from "../utils/equations";
  import CodeBlock from "../components/CodeBlock.svelte";
  import LineGraph from "../components/graphs/LineGraph.svelte";
  import LineGraphControls from "../components/graphs/LineGraphControls.svelte";
  import LinearRegressionFold from "../components/sections/linear-regression/LinearRegressionFold.svelte";
  import ProblemsLrFold from "../components/sections/linear-regression/ProblemsLRFold.svelte";

  let m = 2;
  let c = 1;
</script>

<svelte:head>
  <script
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
</svelte:head>

<article class="prose pl-8">
  <h1 class="mb-8 border-b-2">The basics</h1>
  <p>Lets start off with some of the basics - with a straight line graph!</p>
  <CodeBlock>
    <p>$$y = mx + c $$</p>
    <ul>
      <li>'m' is the gradient or steepness of the line</li>
      <li>
        'c' is known as the y-intercept or where the line crosses the y-axis.
      </li>
    </ul>
  </CodeBlock>
  <section class="mt-16">
    <LineGraph id={"line_graph1"} {m} {c} />
    <LineGraphControls bind:m bind:c />
  </section>
  <LinearRegressionFold />
  <ProblemsLrFold />
</article>
