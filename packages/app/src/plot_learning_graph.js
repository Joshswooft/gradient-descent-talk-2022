export default function plotLearningGraph(errors) {
  const data = errors.map((e, i) => ({ x: i, y: e }));
  const x_legend = "Number of iterations";
  const y_legend = "Cost J";

  const max_y = Math.max(...errors);

  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 130, bottom: 50, left: 80 },
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select("#learning_plot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Add X axis --> it is a date format
  const x = d3.scaleLinear().domain([0, errors.length]).range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear().domain([0, max_y]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Add the line
  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.x);
        })
        .y(function (d) {
          return y(d.y);
        })
    );

  // Add x and y legends
  svg
    .append("text")
    .attr("class", "x-label")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 30) + ")"
    )
    .style("text-anchor", "middle")
    .text(x_legend);

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(y_legend);
}
