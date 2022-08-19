import * as d3 from "https://cdn.skypack.dev/d3@7";

const margin = { top: 10, right: 130, bottom: 50, left: 60 },
  width = 800 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

function random(x) {
  return Math.floor(Math.random() * x);
}

function updatePlot(id, x, y, xAxisScale, yAxisScale) {
  console.log("updated y: ", y);
  let svg = d3.select(`#${id} svg`).selectChild("g");

  let data = [];

  // assumes x and y are equal length
  for (let i = 0; i < x.length; i++) {
    data.push({ x: x[i], y: y[i] });
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

  console.log("old data: ", oldData);

  // updates the dots
  dotsSelection.join(
    (enter) =>
      enter
        .append("circle")
        .attr("cx", function (d) {
          return xAxisScale(d.x);
        })
        .attr("r", 5)
        .call((enter) =>
          // transitions the data from the old y value to the new y value
          enter.transition(t).attr("cy", function (d) {
            return yAxisScale(d.y);
          })
        )
        .style("fill", "gray")
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

  //   TODO: update the line
}

function plotLineGraph(id, x, y, dotColor = "red", lineColor = "blue") {
  const wrapper = document.getElementById(id);
  let svg = wrapper.querySelector("svg");

  console.log("svg: ", svg);

  if (!svg) {
    svg = d3
      .select("#" + id)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    console.log("svg from d3: ", svg);
  } else {
    svg = d3.select(`#${id} svg`).selectChild("g");
  }

  const maxX = Math.max(...x);
  const maxY = Math.max(...y);

  // add X axis
  const xAxisScale = d3.scaleLinear().domain([0, maxX]).range([0, width]);

  const existingXAxis = svg.select("#x-axis");
  console.log(existingXAxis);
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

  const data = [];

  // assumes x and y are equal length
  for (let i = 0; i < x.length; i++) {
    data.push({ x: x[i], y: y[i] });
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
    .duration(750)
    .delay(200)
    .attr("r", 5);

  const lineFunc = d3
    .line()
    .x((d) => xAxisScale(d.x))
    .y((d) => yAxisScale(d.y));

  const existingLine = svg.select("#hypothesis-line");
  existingLine.remove();
  // Add line
  svg
    .append("path")
    .datum(data)
    .attr("d", lineFunc(data))
    .attr("fill", "none")
    .attr("stroke", lineColor)
    .attr("id", "hypothesis-line");
}

function createHypothesis(m, x, c) {
  return x.map((xData) => m * xData + c);
}

async function main() {
  const x = Array.from(Array(8).keys());
  let m = 2; // gradient
  let c = 1; // y-intercept
  //   y = mx + c
  let y = createHypothesis(m, x, c);

  const maxX = Math.max(...x);
  const maxY = Math.max(...y);

  // add X axis
  const xAxisScale = d3.scaleLinear().domain([0, maxX]).range([0, width]);
  const yAxisScale = d3.scaleLinear().domain([0, maxY]).range([height, 0]);

  console.log(document.getElementById("gradient-slider").value);

  document
    .getElementById("gradient-slider")
    .addEventListener("change", function () {
      m = parseInt(document.getElementById("gradient-slider").value, 10);
      y = createHypothesis(m, x, c);
      updatePlot("line_graph1", x, y, xAxisScale, yAxisScale);
    });

  document
    .getElementById("y-intercept-slider")
    .addEventListener("change", function () {
      c = parseInt(this.value, 10);
      y = createHypothesis(m, x, c);
      updatePlot("line_graph1", x, y, xAxisScale, yAxisScale);
    });

  plotLineGraph("line_graph1", x, y);
}

await main();
