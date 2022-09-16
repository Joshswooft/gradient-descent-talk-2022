<script>
  import { onMount } from "svelte";
  // @ts-ignore
  import * as d3 from "https://cdn.skypack.dev/d3@7";

  export let id = "line_graph1";
  export let m = 2; // gradient
  export let c = 1; // y-intercept
  export let hasAddedPoints = false;

  const stddev = 0.1;

  // Generates a normal distributed error.
  const error = d3.randomNormal(0, stddev);

  function getRandomPoint() {
    const x = Math.round(Math.random() * xAxisScale.domain()[1]);
    const m = Math.round(Math.random() * 3);
    const c = Math.round(Math.random() * 3);
    return {
      x: x,
      y: hypothesis(m, x, c) + error(),
    };
  }

  function initializePoints(num = 20) {
    const result = [];
    for (var i = 0; i < num; i++) {
      const point = getRandomPoint();
      point.id = "point-" + i;
      result.push(point);
    }
    return result;
  }

  const margin = { top: 10, right: 130, bottom: 50, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const x = Array.from(Array(8).keys());
  //   y = mx + c
  let y = createHypothesis(m, x, c);

  const maxX = Math.max(...x);
  const maxY = Math.max(...y);

  // add X axis
  const xAxisScale = d3.scaleLinear().domain([0, maxX]).range([0, width]);
  const yAxisScale = d3.scaleLinear().domain([0, maxY]).range([height, 0]);

  let points = initializePoints();

  function updateDots(id, x, y) {
    let svg = d3.select(`#${id} svg`).selectChild("g");

    let data = hasAddedPoints ? points : [];

    if (!hasAddedPoints) {
      // assumes x and y are equal length
      for (let i = 0; i < x.length; i++) {
        data.push({ x: x[i], y: y[i] });
      }
    }

    const t = svg.transition().duration(750);

    const dotsSelection = svg
      .selectChild("#dots")
      .selectAll("circle")
      .data(data, (d) => d.x);

    const oldData = svg
      .select("#dots")
      .selectChildren()
      .nodes()
      .map((n) => n.__data__);

    // updates the dots
    dotsSelection.join(
      (enter) =>
        enter
          .append("circle")
          .attr("cx", function (d) {
            return xAxisScale(d.x);
          })
          .attr("r", 4)
          .call((enter) =>
            // transitions the data from the old y value to the new y value
            enter.transition(t).attr("cy", function (d) {
              return yAxisScale(d.y);
            })
          )
          .style("fill", "red")
          //   .merge(dotsSelection)
          .selection(),
      (update) =>
        update
          .transition(t)
          .delay(function (d, i) {
            return i * 50;
          })
          .attr("r", 4)
          .style("fill", "gray")
          .attr("cy", function (d) {
            const oldXData = oldData.find((dd) => dd.x == d.x);
            let oldY = 0;
            if (typeof oldXData !== "undefined") {
              oldY = oldXData.y;
            }
            return yAxisScale(oldY);
          })
          .transition()
          .duration(500)
          .style("fill", "red")
          .attr("r", 5),
      (exit) =>
        exit.call((e) =>
          e.transition(t).style("fill", "grey").style("opacity", 0).remove()
        )
    );
  }

  function updatePlot(id, x, y, xAxisScale, yAxisScale) {
    let svg = d3.select(`#${id} svg`).selectChild("g");
    const t = svg.transition().duration(750);

    if (!hasAddedPoints) {
      updateDots(id, x, y);
    }

    const hypothesisData = [
      { x: 0, y: hypothesis(m, 0, c) },
      { x: 7, y: hypothesis(m, 7, c) },
    ];

    // update the line
    const line = d3.select("#hypothesis-line");

    const lineFunc = d3
      .line()
      .x((d) => xAxisScale(d.x))
      .y((d) => yAxisScale(d.y));

    line
      .datum(hypothesisData)
      .transition(t)
      .attr("d", lineFunc(hypothesisData));
  }

  function plotLineGraph(id, x, y, dotColor = "red", lineColor = "blue") {
    const wrapper = document.getElementById(id);
    let svg = wrapper.querySelector("svg");

    if (!svg) {
      svg = d3
        .select("#" + id)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    } else {
      svg = d3.select(`#${id} svg`).selectChild("g");
    }

    const maxX = Math.max(...x);
    const maxY = Math.max(...y);

    // add X axis
    const xAxisScale = d3.scaleLinear().domain([0, maxX]).range([0, width]);

    const existingXAxis = svg.select("#x-axis");
    existingXAxis.remove();

    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xAxisScale));

    const existingYAxis = svg.select("#y-axis");
    existingYAxis.remove();

    const yAxisScale = d3.scaleLinear().domain([0, maxY]).range([height, 0]);
    svg.append("g").attr("id", "y-axis").call(d3.axisLeft(yAxisScale));

    let data = hasAddedPoints ? points : [];

    if (!hasAddedPoints) {
      // assumes x and y are equal length
      for (let i = 0; i < x.length; i++) {
        data.push({ x: x[i], y: y[i] });
      }
    }

    const existingDots = svg.select("#dots");
    existingDots.remove();

    // Add dots
    svg
      .append("g")
      .attr("id", "dots")
      .selectAll("dot")
      .data(data)
      .join("circle")
      .attr("cx", function (d) {
        return xAxisScale(d.x);
      })
      .attr("cy", function (d) {
        return yAxisScale(d.y);
      })
      .style("fill", dotColor)
      .transition()
      .duration(1400)
      .ease(d3.easeCubicOut)
      .delay(function (d, i) {
        return i * 160;
      })
      .attr("r", 5);

    const lineFunc = d3
      .line()
      .x((d) => xAxisScale(d.x))
      .y((d) => yAxisScale(d.y));

    const existingLine = svg.select("#hypothesis-line");
    existingLine.remove();
    // Add line

    const hypothesisData = [
      { x: 0, y: hypothesis(m, 0, c) },
      { x: 7, y: hypothesis(m, 7, c) },
    ];

    svg
      .append("path")
      .datum(hypothesisData)
      .attr("stroke-dasharray", "1000 1000")
      .attr("stroke-dashoffset", "1000")
      .attr("d", lineFunc(hypothesisData))
      .attr("fill", "none")
      .attr("stroke", lineColor)
      .attr("id", "hypothesis-line")
      .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attr("stroke-dashoffset", 0);
  }
  onMount(async () => {
    plotLineGraph(id, x, y);
  });

  function hypothesis(m, x, c) {
    return m * x + c;
  }

  function createHypothesis(m, x, c) {
    return x.map((xData) => hypothesis(m, xData, c));
  }

  function onSliderChange(m, c, x) {
    y = createHypothesis(m, x, c);
    updatePlot(id, x, y, xAxisScale, yAxisScale);
  }

  $: onSliderChange(m, c, x);

  function togglePoints() {
    points = initializePoints();
    hasAddedPoints = !hasAddedPoints;
    updateDots(id, x, y);
  }
</script>

<div {id} style="height: 400px" />
<button on:click={togglePoints}>
  {#if !hasAddedPoints}
    Add points
  {:else}
    Remove points
  {/if}
</button>
