import meanSquareError from "../utils/mse";

export default async function plotScatterDiagram(id, url) {
  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
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
  d3.json(
    url
  ).then(function (data) {
      console.log("data: ", data);
    // Add X axis
    const xs = data.map(d => +d["X2 house age"])
    const max_x = Math.max(...xs)

    const ys = data.map(d => +d["Y house price of unit area"])
    const max_y = Math.max(...ys)

    const x = d3.scaleLinear().domain([0, max_x]).range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear().domain([0, max_y]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Add dots
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .join("circle")
      .attr("cx", function (d) {
        return x(d["X2 house age"]);
      })
      .attr("cy", function (d) {
        return y(d["Y house price of unit area"]);
      })
      .attr("r", 1.5)
      .style("fill", "#69b3a2");
      // Add the regression line
      // linear line
      // const hypothesisData = [{ x: 0, y: height}, { x: width, y: 0}];
  
      // TODO: calculate the error for the hypothesis using mse
      // y = mx + c
      // using linear line so h = f(x)
      const y_intercept = 20;
      const y_hats = data.map(d => parseFloat(d["X2 house age"]) + y_intercept)
      console.log("y_hats: ", y_hats)
      const err = meanSquareError(y_hats, ys)
      console.log("MSE: ", err)

      const hypothesisData = data.map((d, i) => ({ x: d["X2 house age"], y: y_hats[i] }))
    
      const lineFunc = d3.line()
      .x( d => x(d.x) )
      .y( d => y(d.y) )
    
      svg.append('path')
      .datum(hypothesisData)
      .attr('d', lineFunc(hypothesisData))
      .attr('stroke', 'blue')
      .attr('fill', 'none');

    });
    
  }
