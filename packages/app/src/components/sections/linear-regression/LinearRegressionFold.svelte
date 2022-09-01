<script>
  import {
    simpleLinearRegression,
    multiVariableLinearRegression,
  } from "../../../utils/equations";
</script>

<article class="prose pl-8 mt-16">
  <h1 class="mb-8 border-b-2">What is Linear Regression?</h1>
  <p>
    Linear regression fits a straight line that minimises the errors between the
    predicted values and the actual values.
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
</article>
