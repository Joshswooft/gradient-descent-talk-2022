<script>
  import { onMount } from "svelte";
  // @ts-ignore
  import * as d3 from "https://cdn.skypack.dev/d3@7";
  import {
    simpleLinearRegression,
    multiVariableLinearRegression,
  } from "../utils/equations";
  import CodeBlock from "../components/CodeBlock.svelte";

  const margin = { top: 10, right: 130, bottom: 50, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  let m = 2; // gradient
  let c = 1; // y-intercept

  const x = Array.from(Array(8).keys());
  //   y = mx + c
  let y = createHypothesis(m, x, c);

  const maxX = Math.max(...x);
  const maxY = Math.max(...y);

  // add X axis
  const xAxisScale = d3.scaleLinear().domain([0, maxX]).range([0, width]);
  const yAxisScale = d3.scaleLinear().domain([0, maxY]).range([height, 0]);

  function updatePlot(id, x, y, xAxisScale, yAxisScale) {
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

    const line = d3.select("#hypothesis-line");

    const lineFunc = d3
      .line()
      .x((d) => xAxisScale(d.x))
      .y((d) => yAxisScale(d.y));

    line.datum(data).transition(t).attr("d", lineFunc(data));
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
    svg
      .append("path")
      .datum(data)
      .attr("stroke-dasharray", "1000 1000")
      .attr("stroke-dashoffset", "1000")
      .attr("d", lineFunc(data))
      .attr("fill", "none")
      .attr("stroke", lineColor)
      .attr("id", "hypothesis-line")
      .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attr("stroke-dashoffset", 0);
  }
  onMount(async () => {
    plotLineGraph("line_graph1", x, y);
  });

  function createHypothesis(m, x, c) {
    return x.map((xData) => m * xData + c);
  }

  function onSliderChange() {
    y = createHypothesis(m, x, c);
    updatePlot("line_graph1", x, y, xAxisScale, yAxisScale);
  }
</script>

<svelte:head>
  <script
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
</svelte:head>

<article class="prose">
  <h1 class="mb-8 border-b-2">The basics</h1>
  <p>Lets start off with some of the basics - with a straight line graph!</p>
  <CodeBlock>
    <p>$$y = mx + c $$</p>
    <ul>
      <li>'m' is the gradient or steepness of the line</li>
      <li>
        'c' is known as the y-intercept or where the line crosses the y-axis.
      </li>
    </ul>
  </CodeBlock>
  <section class="mt-16">
    <div id="line_graph1" style="height: 400px" />
    <div id="controls">
      <div class="slider">
        <input
          bind:value={m}
          on:change={onSliderChange}
          id="gradient-slider"
          type="range"
          min="0"
          max="5"
        />
        <input
          bind:value={c}
          on:change={onSliderChange}
          id="y-intercept-slider"
          type="range"
          min="0"
          max="5"
        />
      </div>
    </div>
  </section>
  <section class="mt-16">
    <h1 class="mb-8 border-b-2">What is Linear Regression?</h1>
    <p>
      Linear regression fits a straight line that minimises the errors between
      the predicted values and the actual values.
    </p>
    <p><b>Regression problem: </b> Predicting continuous values</p>
    <p>
      An example of linear regression: Trying to predict how much a house costs
      based on its age.
    </p>
    <p>Linear regression has 3 main uses:</p>
    <ul>
      <li>
        Determining the strength of the predictor variables e.g. What is the
        relationship between time spent in the gym and muscle mass gained.
      </li>
      <li>
        Forecasting an effect e.g. If I study for 20 hours on this exam, what is
        my predicted grade?
      </li>
      <li>
        Trend forecasting e.g. What will the price of bitcoin be in 6 months?
      </li>
    </ul>

    <p>Linear Regression has many real world uses like:</p>
    <ul>
      <li>Financial forecasting</li>
      <li>Weather analysis</li>
      <li>Medical diagnosis</li>
    </ul>

    <h2>Linear Regression equation</h2>
    <p>For simple linear regression: \({simpleLinearRegression}\)</p>
    <p>
      For multivariate linear regression: \({multiVariableLinearRegression}\)
    </p>
    <p>Note: we use \(x_0 = 1\) for notation.</p>
    <p>θ=Parameters, x=features</p>
  </section>
  <section class="prose">
    <h1 class="mt-12 mb-8 border-b-2">Problems with Linear Regression</h1>
    <ul>
      <!-- TODO: show example of overfitting vs underfitting -->
      <li>
        Overfitting: This is where the model fits the current data but doesn't
        generalise to new data
      </li>
      <li>
        Multicollinearity: When there is a correlation between the independent
        variables aka your features.
      </li>
      <li>
        It only models a straight line which might be unsuitable for the type of
        problem you have. - Solution: Introduce polynomial features.
      </li>
    </ul>
    <h2>Why is Multicollinearity a Potential Problem?</h2>
    <p>
      A key goal of regression analysis is to isolate the relationship between
      each independent variable and the dependent variable.
    </p>
    <p>
      The idea is that you can change the value of one independent variable and
      not the others. However, when independent variables are correlated, it
      indicates that changes in one variable are associated with shifts in
      another variable. The stronger the correlation, the more difficult it is
      to change one variable without changing another. It becomes difficult for
      the model to estimate the relationship between each independent variable
      and the dependent variable independently because the independent variables
      tend to change in unison.
    </p>
    <h3>The 2 types of multicollinearity</h3>
    <ul>
      <li>
        <b>Structural multicollinearity:</b> This type occurs when we create a model
        term using other terms. In other words, it’s a byproduct of the model that
        we specify rather than being present in the data itself. For example, if
        you square term X to model curvature, clearly there is a correlation between
        X and X^2.
      </li>
      <li>
        <b>Data multicollinearity:</b> This type of multicollinearity is present
        in the data itself rather than being an artifact of our model. Observational
        experiments are more likely to exhibit this kind of multicollinearity.
      </li>
    </ul>
    <h3>Do I have to fix Multicollinearity?</h3>
    <p>
      Multicollinearity makes it hard to interpret your coefficients, and it
      reduces the power of your model to identify independent variables that are
      statistically significant.
    </p>
    <p>Depending on your goal you might not need to fix multicollinearity:</p>
    <ul>
      <li>
        The severity of the problem increases with how much multicollinearity
        you have
      </li>
      <li>
        Multicollinearity only affects the variables that are correlated. If you
        don't care about understanding these variables then you don't need to
        fix.
      </li>
      <li>
        Multicollinearity does not influence the predictions or the precision of
        your predictions. If your goal is to make predictions without needing to
        worry about explaining how you came to those predictions then
        multicollinearity is not a problem.
      </li>
    </ul>
  </section>
</article>
