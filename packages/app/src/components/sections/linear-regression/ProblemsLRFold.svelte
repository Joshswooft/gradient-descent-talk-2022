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
    indicates that changes in one variable are associated with shifts in another
    variable. The stronger the correlation, the more difficult it is to change
    one variable without changing another. It becomes difficult for the model to
    estimate the relationship between each independent variable and the
    dependent variable independently because the independent variables tend to
    change in unison.
  </p>
  <h3>The 2 types of multicollinearity</h3>
  <ul>
    <li>
      <b>Structural multicollinearity:</b> This type occurs when we create a model
      term using other terms. In other words, it’s a byproduct of the model that
      we specify rather than being present in the data itself. For example, if you
      square term X to model curvature, clearly there is a correlation between X
      and X^2.
    </li>
    <li>
      <b>Data multicollinearity:</b> This type of multicollinearity is present in
      the data itself rather than being an artifact of our model. Observational experiments
      are more likely to exhibit this kind of multicollinearity.
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
      The severity of the problem increases with how much multicollinearity you
      have
    </li>
    <li>
      Multicollinearity only affects the variables that are correlated. If you
      don't care about understanding these variables then you don't need to fix.
    </li>
    <li>
      Multicollinearity does not influence the predictions or the precision of
      your predictions. If your goal is to make predictions without needing to
      worry about explaining how you came to those predictions then
      multicollinearity is not a problem.
    </li>
  </ul>
</section>
