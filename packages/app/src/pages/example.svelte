<script lang="ts">
  import plotScatterDiagram from "../plot_scatter";
  import { onMount } from "svelte";
  import realEstateData from "../../../../data/real_estate.json";
  import gradientDescentMultiExample, {
    createFeatures,
  } from "../examples/gradient_descent_multi";
  import plotLearningGraph from "../plot_learning_graph";
  import RealEstateDataTable from "../components/tables/RealEstateDataTable.svelte";

  import Highlight from "svelte-highlight";
  import typescript from "svelte-highlight/languages/typescript";
  import github from "svelte-highlight/styles/github";
  import gradientDescent from "../utils/gradient_descent";
  import { nonVectorizedMSE } from "../utils/mse";
  import CodeBlock from "../components/CodeBlock.svelte";
  import GdCodeBlock from "../components/GDCodeBlock.svelte";
  import GdAlgCodeBlock from "../components/GdAlgCodeBlock.svelte";
  import { modifiedMse } from "../utils/equations";

  let scatterId = "scatter-example";
  let learningPlotId = "learning-graph-example";

  const url = "http://localhost:8080/data";
  let thetas = [];
  let formattedHypothesis = "";

  onMount(async () => {
    await plotScatterDiagram(scatterId, url);
    const { Jerror, t } = gradientDescentMultiExample(realEstateData.data);
    plotLearningGraph(learningPlotId, Jerror);
    thetas = t.toArray();

    let hyp = "";
    const keys = Object.keys(realEstateData.data[0]);
    // remove y key
    keys.pop();
    // remove no. key
    keys.shift();

    // add 'c' term
    keys.unshift("c");

    console.log("keys; ", keys);
    thetas.map((param, index) => {
      hyp += `${param} * ${keys[index]}`;
      if (index < thetas.length - 1) {
        hyp += " + ";
      }
    });
    formattedHypothesis = hyp;
  });
</script>

<svelte:head>
  {@html github}
  <script
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
</svelte:head>

<main class="container px-4">
  <h1 class="mb-16 text-center">Predicting the house price</h1>
  <p />
  <div class="overflow-x-auto mb-8" style="max-height: 400px;">
    <RealEstateDataTable data={realEstateData.data} />
  </div>
  <div id={scatterId} />
  <p>Step 1: Create your features</p>
  <div class="block">
    <Highlight language={typescript} code={`${createFeatures}`} />
  </div>
  <p>Step 2: Perform gradient descent</p>
  <div class="block">
    <Highlight language={typescript} code={`${gradientDescentMultiExample}`} />
  </div>
  <p class="mt-8">Inner workings of gradient descent</p>
  <div class="flex gap-4 justify-evenly flex-row items-center">
    <div class="block">
      <Highlight language={typescript} code={`${gradientDescent}`} />
    </div>
    <div style="margin-top: 2em">
      <GdCodeBlock />
      <GdAlgCodeBlock />
    </div>
  </div>
  <p>Inner workings of our cost function</p>
  <div class="flex gap-4 justify-evenly flex-row items-center">
    <div class="block">
      <Highlight language={typescript} code={`${nonVectorizedMSE}`} />
    </div>
    <div class="mt-8">
      <CodeBlock>
        <p>$$ {modifiedMse} $$</p>
      </CodeBlock>
    </div>
  </div>
  <div id={learningPlotId} />
  <div class="p-8" style="color: red;">
    hypothesis = {formattedHypothesis}
  </div>
  <!-- <div id="learning_plot" /> -->
</main>

<style>
  .block {
    background: #0175ff;
    padding: 1em;
    border-radius: 0.375rem;
    margin-top: 2em;
    margin-bottom: 2em;
  }
</style>
