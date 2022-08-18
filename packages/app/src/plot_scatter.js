import meanSquareError from "./utils/mse";
import { sparse } from "mathjs";
import { hypothesis } from "./utils/hypothesis";
import { matrix, zeros, ones, transpose } from "mathjs";
import { omit } from "./utils/omit";
import gradientDescent from "./utils/gradient_descent";
import plotLearningGraph from "./plot_learning_graph";

const LEARNING_RATE = 0.0001;

export default async function plotScatterDiagram(id, url) {
  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 130, bottom: 50, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select("#" + id)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //Read the data
  d3.json(url).then(function (data) {
    console.log("data: ", data);

    const featureName = "X2 house age";
    const yName = "Y house price of unit area";

    const xs = data.map((d) => +d[featureName]);
    const max_x = Math.max(...xs);

    const ys = data.map((d) => +d[yName]);
    const max_y = Math.max(...ys);

    // Add X axis
    const x = d3.scaleLinear().domain([0, max_x]).range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear().domain([0, max_y]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    const dotColor = "#69b3a2";
    const hypothesisLineColor = "blue";

    // Add dots
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .join("circle")
      .attr("cx", function (d) {
        return x(d[featureName]);
      })
      .attr("cy", function (d) {
        return y(d[yName]);
      })
      .attr("r", 1.5)
      .style("fill", dotColor);

    // Add the regression line
    const num_training = data.length;
    let X = matrix([ones(num_training), data.map((d) => d[featureName])]);
    X = transpose(X);

    let theta = zeros(X.size()[1], 1);

    let { t, Jerror } = gradientDescent(
      X,
      sparse(ys),
      theta,
      LEARNING_RATE,
      100
    );

    const predictions = hypothesis(X, t);
    const y_hats = predictions.toArray();
    const err = meanSquareError(sparse(y_hats), sparse(ys));
    console.log("MSE: ", err);

    plotLearningGraph("learning_plot", Jerror);

    let hypothesisData = data.map((x, i) => ({
      x: parseFloat(x[featureName]),
      y: y_hats[i][0],
    }));

    hypothesisData.sort((a, b) => b.x - a.x);

    const hypothesisLine = hypothesisData;

    const lineFunc = d3
      .line()
      .x((d) => x(d.x))
      .y((d) => y(d.y));

    svg
      .append("path")
      .datum(hypothesisLine)
      .attr("d", lineFunc(hypothesisLine))
      .attr("stroke", hypothesisLineColor)
      .attr("fill", "none")
      .attr("id", "hypothesis-line");

    // Add the hypothesis line legend
    svg
      .append("g")
      .append("text")
      .attr("class", "hypothesis-line")
      .datum(function () {
        const data = hypothesisData.sort((a, b) => a.y - b.y);
        const lastRecord = data[data.length - 1];
        return { x: parseFloat(lastRecord.x), y: lastRecord.y };
      })
      .attr("transform", function (d) {
        // Put the text at the position of the last point
        return "translate(" + x(d.x) + "," + y(d.y) + ")";
      })
      .attr("x", 12) // shift text right a bit
      .attr("y", 5) // shift text down a bit
      .text("hypothesis line")
      .attr("fill", hypothesisLineColor)
      .style("font-size", 15);
  });

  // Add x and y legends
  svg
    .append("text")
    .attr("class", "x-label")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 30) + ")"
    )
    .style("text-anchor", "middle")
    .text("Age (years)");

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("House price (k)");
}
