export default function contourPlot(id, data) {
  const margin = { top: 10, right: 130, bottom: 50, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  var svg = d3
    .select("#" + id)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Add X axis
  const x = d3.scaleLinear().domain([0, max_x]).range([0, width]);
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear().domain([0, max_y]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // compute the density data
  var densityData = d3
    .contourDensity()
    .x(function (d) {
      return x(d.x);
    })
    .y(function (d) {
      return y(d.y);
    })
    .size([width, height])
    .bandwidth(20)(
    // smaller = more precision in lines = more lines
    data
  );

  // Add the contour: several "path"
  svg
    .selectAll("path")
    .data(densityData)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("fill", "none")
    .attr("stroke", "#69b3a2")
    .attr("stroke-linejoin", "round");
}
