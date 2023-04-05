<script>
  import Scroller from "../lib/Scroller.svelte";
  import CodeBlock from "../components/codeBlocks/CodeBlock.svelte";
  import LineGraph from "../components/graphs/LineGraph.svelte";
  import LineGraphControls from "../components/graphs/LineGraphControls.svelte";
  import LinearRegressionFold from "../components/sections/linear-regression/LinearRegressionFold.svelte";
  import ProblemsLrFold from "../components/sections/linear-regression/ProblemsLRFold.svelte";

  let m = 2;
  let c = 1;
</script>

<svelte:head>
  <script
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
  ></script>
</svelte:head>

<Scroller splitscreen={true} id="basics-scroller">
  <div slot="background">
    <section class="mt-16">
      <LineGraph id={"line_graph1"} {m} {c} />
      <LineGraphControls bind:m bind:c />
    </section>
  </div>
  <div slot="foreground">
    <section class="section-container">
      <article class="prose pl-12">
        <h1 id="basics-title" class="mb-8 border-b-2">The basics</h1>
        <p>
          Lets start off with some of the basics - with a straight line graph!
        </p>
        <CodeBlock>
          <p>$$y = mx + c $$</p>
          <ul>
            <li>'m' is the gradient or steepness of the line</li>
            <li>
              'c' is known as the y-intercept or where the line crosses the
              y-axis.
            </li>
          </ul>
        </CodeBlock>
      </article>
      <div class="mb-16" />
    </section>
    <LinearRegressionFold />
    <ProblemsLrFold />
  </div>
</Scroller>
