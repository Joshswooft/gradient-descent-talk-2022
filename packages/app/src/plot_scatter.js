import meanSquareError from "../utils/mse";

export default async function plotScatterDiagram(id, url) {
  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 130, bottom: 30, left: 60 },
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
        return y(d["Y house price of unit area"]);
      })
      .attr("r", 1.5)
      .style("fill", dotColor);
    // Add the regression line
    // linear line
    // const hypothesisData = [{ x: 0, y: height}, { x: width, y: 0}];

    // TODO: calculate the error for the hypothesis using mse
    // y = mx + c
    // using one variable atm so h(x) = theta_0 + theta_1*x
    // theta = params, x = features, n = number of samples
    // h(x) = theta_0 + theta_1*x + theta_2*x_2 + ... + theta_n * x_n

    const y_intercept = 20;
    const y_hats = data.map((x) => parseFloat(x[featureName]) + y_intercept);
    console.log("y_hats: ", y_hats);
    const err = meanSquareError(y_hats, ys);
    console.log("MSE: ", err);

    const hypothesisData = data.map((x, i) => ({
      x: x[featureName],
      y: y_hats[i],
    }));

    const lineFunc = d3
      .line()
      .x((d) => x(d.x))
      .y((d) => y(d.y));

    svg
      .append("path")
      .datum(hypothesisData)
      .attr("d", lineFunc(hypothesisData))
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
}
