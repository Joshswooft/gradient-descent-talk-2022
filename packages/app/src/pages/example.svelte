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
</svelte:head>

<main class="container px-4">
  <h1 class="mb-16 text-center">Predicting the house price</h1>
  <p />
  <div class="overflow-x-auto mb-8" style="max-height: 400px;">
    <RealEstateDataTable data={realEstateData.data} />
  </div>
  <div id={scatterId} />
  <p>Step 1: Create your features</p>
  <Highlight language={typescript} code={`${createFeatures}`} />
  <p>Step 2: Perform gradient descent</p>
  <Highlight language={typescript} code={`${gradientDescentMultiExample}`} />
  <p>Inner workings of gradient descent</p>
  <Highlight language={typescript} code={`${gradientDescent}`} />
  <p>Inner workings of our cost function</p>
  <Highlight language={typescript} code={`${nonVectorizedMSE}`} />
  <div id={learningPlotId} />
  <div class="p-8" style="color: red;">
    hypothesis = {formattedHypothesis}
  </div>
  <!-- <div id="learning_plot" /> -->
</main>
