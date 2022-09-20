<script lang="ts">
  import plotScatterDiagram from "../plot_scatter";
  import { onMount } from "svelte";
  import realEstateData from "../../../../data/real_estate.json";
  import gradientDescentMultiExample from "../examples/gradient_descent_multi";
  import plotLearningGraph from "../plot_learning_graph";
  import RealEstateDataTable from "../components/tables/RealEstateDataTable.svelte";
  import { params } from "svelte-spa-router";

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

<main class="container px-4">
  <h1 class="mb-16 text-center">Predicting the house price</h1>
  <p />
  <div class="overflow-x-auto mb-8" style="max-height: 400px;">
    <RealEstateDataTable data={realEstateData.data} />
  </div>
  <div id={scatterId} />
  <div id={learningPlotId} />
  <div class="p-8" style="color: red;">
    hypothesis = {formattedHypothesis}
  </div>
  <!-- <div id="learning_plot" /> -->
</main>
