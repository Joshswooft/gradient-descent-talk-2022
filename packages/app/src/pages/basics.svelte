<script>
  import {
    simpleLinearRegression,
    multiVariableLinearRegression,
  } from "../utils/equations";
  import CodeBlock from "../components/CodeBlock.svelte";
  import LineGraph from "../components/graphs/LineGraph.svelte";
  import LineGraphControls from "../components/graphs/LineGraphControls.svelte";

  let m = 2;
  let c = 1;
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
    <LineGraph id={"line_graph1"} {m} {c} />
    <LineGraphControls bind:m bind:c />
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
