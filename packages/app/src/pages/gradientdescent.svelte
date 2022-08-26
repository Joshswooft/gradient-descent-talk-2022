<script>
  import VisualizeGradDesc from "../components/VisualizeGradDesc.svelte";
  import { chainRule, modifiedMse, powerRule } from "../utils/equations";
  import {
    gradientDescentAlg,
    simpleLinearRegression,
  } from "../utils/equations";

  const Jcost = `J(θ_0, θ_1)`;
  const simpleCostFnExample = `J(θ) = ${Jcost} = θ_0^2 + 3θ_1^2`;
  const simpleGradTheta1 = `$$ θ_0 := θ_0 - \\alpha\\frac{∂}{∂_1}${Jcost} $$`;
  const simpleGradTheta2 = `$$ θ_1 := θ_1 - \\alpha\\frac{∂}{∂_2}${Jcost} $$`;
  const partial = (x) => `\\frac{∂}{∂θ_${x}}`;
  const partialJ = (x) => `${partial(x)}${Jcost} = `;
  const simpleJDerivative = (x) =>
    `${partialJ(x)}${partial(1)}θ_0 + ${partial(2)}3θ_1^2 = `;

  const d1 = `{ \\sum_{i=1}^{n} ${partial(
    "j"
  )} \\frac {1}{2n}} (Y_{i}-{\\hat {Y_{i}}})^{2}`;

  const d2 = `{ \\frac {1}{2n}} \\sum_{i=1}^{n} ${partial(
    "j"
  )}  (Y_{i}-{\\hat {Y_{i}}})^{2}`;

  const d3ChainRule = `{ \\frac {1}{2n}} \\sum_{i=1}^{n} ${partial(
    "j"
  )} f(g(x))`;

  const derivativeChainRule = `{ \\frac {1}{2n}} \\sum_{i=1}^{n} f'(g(x))g'(x)`;

  const gx = `h_θ(x_i) - y_i`;

  const dPower = `{ \\frac {1}{2n}} \\sum_{i=1}^{n} 2(${gx})${partial(
    0
  )}(${gx})`;

  const yHat = `\\hat{Y_{i}}`;

  const partialDeriv0 = `${partial(0)}(\\theta_0 + \\theta_1x_1 - y_i)`;
  const evaluatedPartialDeriv0 = `${partialJ(
    0
  )} { \\frac {1}{2n}} \\sum_{i=1}^{n}2(${gx})`;

  const partialDeriv1 = `${partial(1)}(\\theta_0 + \\theta_1x_1 - y_i)`;
  const evaluatedPartialDeriv1 = `${partialJ(
    1
  )} { \\frac {1}{2n}} \\sum_{i=1}^{n}2(${gx})x`;

  const updateTheta0 = `θ_0 := θ_0 - \\alpha( { \\frac {1}{n}} \\sum_{i=1}^{n}${gx} )`;
  const updateTheta1 = `θ_1 := θ_1 - \\alpha( {\\frac {1}{n}} \\sum_{i=1}^{n}(${gx})x )`;
</script>

<svelte:head>
  <script
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
</svelte:head>

<div class="text-left">
  <section class="grid grid-cols-2">
    <article class="px-2 prose">
      <h1 class="mb-5 border-b-2">Gradient descent</h1>
      <p>
        We can think of gradient descent as an optimiser where it's trying to
        find the minimum value for some function.
      </p>
      <p>
        The idea is to find the minimum value of our cost function (MSE) as this
        will be where the error is the least and will provide us with the best
        predictions.
      </p>
      <p>
        The key for gradient descent to work is that our cost function must be a
        convex function which has a global minimum.
      </p>
      <h2>So how do we find the point where the error is the least?</h2>
      <p>
        We can't plot each point because there is infinite amount of positions
        we can go and although we can make some guesstimates based on the data
        this would be un-feasible when dealing with higher dimensionality data!
      </p>
      <p>The solution here is to use some maths!</p>
      <p>All we need to do is follow the slope to the lowest point!</p>
      <p>
        You might remember from school that to calculate the <b>average</b> slope
        we do:
      </p>
      <p>
        $$slope = change \: in \: y / change \: in \: x = \Delta y /\Delta x$$
      </p>
      <p>$$ slope = (y_2 - y_1) / (x_2 - x_1) $$</p>
      <p>
        If we look at the above graph again you will notice that the gradient or
        slope of the line is practically 0 at the lowest point! Unfortantely
        calculating the slope at a point doesn't work!
      </p>
      <p>$$ slope = \Delta y /\Delta x = 0/0 = ???$$</p>
      <p>
        Instead what we do is calculate something called the derivative. You can
        think of this as being a very small difference in the slope that shrinks
        towards zero! The equation becomes this:
      </p>
      <!-- TODO: need a graph that explains this formulae -->
      <p>$$ Δy/Δx = f(x+Δx) − f(x) /Δx $$</p>
      <p>y changes to $$ y = f(x + Δx) $$</p>
      <p>x changes to $$ x = x + Δx $$</p>
      <p>
        So taking our previous example of the $$y = (x - 20)^2 + c $$ lets
        calculate the derivative for this function. (Note: calculating the
        derivative is called differentiation).
      </p>
      <p>$$ ((x + Δx - 20)^2 - (x-20)^2) / Δx $$</p>
      <p>Note the derivative of a constant is 0.</p>
      <p>Expand</p>
      <p>
        $$ ([x^2 + xΔx -20x + xΔx + Δx^2 - 20Δx - 20x -20Δx + 400 ] - [x^2 - 40x
        + 400]) / Δx $$
      </p>
      <p>Simplify</p>
      <p>
        $$ ([x^2 + 2xΔx + Δx^2 - 40x - 40Δx + 400] - [x^2 - 40x + 400]) / Δx $$
      </p>
      <p>Cancel out terms</p>
      <p>$$ (Δx^2 + 2xΔx - 40Δx) / Δx $$</p>
      <p>Divide and rearrange</p>
      <p>$$ 2(x - 20) + Δx $$</p>
      <p>Δx heads towards 0</p>
      <p>$$ 2(x - 20) $$</p>
    </article>
    <div class="px-2">
      <VisualizeGradDesc />
      <p>Here's an example of a convex function:</p>
      <p>$$y = (x - 20)^2 + c $$</p>
    </div>
  </section>

  <section class="grid grid-cols-2">
    <article>
      <h1 class="mb-5 border-b-2">Introducing alpha</h1>
      <p>\(\alpha\) is our learning rate.</p>
      <h2>Common problems</h2>
      <p>If \(\alpha\) is too <b>small</b>, gradient descent can be slow.</p>
      <p>
        If \(\alpha\) is too <b>large</b>, then gradient descent can overshoot
        the minimum. It may fail to converge and even diverge!
      </p>
      <p>
        Note: Gradient descent can converge to a local minimum even with the
        learning rate fixed. This is because as we approach the minimum the
        slope will be smaller so we automatically take smaller steps.
      </p>
    </article>
    <!-- TODO: Show how small/large alpha affects learning -->
  </section>
  <section class="grid grid-cols-2 px-2">
    <article class="prose">
      <h2>Gradient descent algorithm</h2>
      <i>repeat until convergence &lbrace;</i>
      <span>{gradientDescentAlg}</span>
      <i>&rbrace;</i>
      <ul>Remember that:</ul>
      <li>\(\alpha\) is our learning rate.</li>
      <li>\(θ\) = parameters</li>
      <li>\(j\) = number of parameters</li>
      <li>
        \(∂\) is used to identify partial derivative variables. \(∂\) is called
        'dee'
      </li>
      <p>A partial derivative whats that?</p>
      <p>
        Partial derivatives tell you how a multivariable function changes as you
        tweak just one of the variables in its input. The reason for a new type
        of derivative is that when the input of a function is made up of
        multiple variables, we want to see how the function changes as we let
        just one of those variables change while holding all the others
        constant.
      </p>
      <h2>Patial derivative example</h2>
      <p>
        For a simple example, lets assume our cost function looks like this: \({simpleCostFnExample}\)
      </p>
      <p>Notice how it's made up of two variables \(θ_0\) and \(θ_1\).</p>
      <p>Our gradient descent algorithm would therefore look like this:</p>
      <i>repeat until convergence &lbrace;</i>
      <span>{simpleGradTheta1}</span>
      <span>{simpleGradTheta2}</span>
      <i>&rbrace;</i>

      <p>Now we calculate the partial derivatives of these 2 equations:</p>
      <p>$$ {simpleJDerivative(1)} 2θ_0$$</p>
      <p>$$ {simpleJDerivative(2)} 6θ_1$$</p>
      <p>
        Lets stick this back into our original gradient descent algorithm to see
        how it all looks together!
      </p>
      <i>repeat until convergence &lbrace;</i>
      <span>$$ θ_0 := θ_0 - \alpha2θ_0 $$</span>
      <span>$$ θ_1 := θ_1 - \alpha6θ_1 $$</span>
      <i>&rbrace;</i>
      <h2>The actual gradient descent algorithm</h2>
      <p>
        Now lets figure out how we do gradient descent with our actual cost
        function MSE!
      </p>
      <p>
        Here's the formulae below for those who can't remember
        <span>$$ {Jcost} = {modifiedMse} $$</span>For those who are observant
        will notice we are using the modified MSE with the 2n term which is
        going to become clear pretty soon on why we do that.
      </p>
      <div>
        <p>Derivative Rules</p>
        <ul>
          <li>The power rule: \({powerRule}\)</li>
          <li>Constant: \(f(x) = c, f'(x) = 0\)</li>
          <li>Line: \(f(x) = x, f'(x) = 1\)</li>
          <li>Multiplication by constant: \( cf => cf' \)</li>
          <li>Sum rule: \( f + g => f' + g' \)</li>
          <li>Chain rule: \({chainRule} \)</li>
        </ul>
      </div>
      <div>
        <p>$$ {Jcost} = {modifiedMse} $$</p>
        <p>1. Apply the sum rule</p>
        <p>1. \({d1} \)</p>
        <p>2. Multiplication by constant</p>
        <p>2. \( {d2} \)</p>
        <p>
          Substitute <i
            >\({yHat}\) for hypothesis: \( {simpleLinearRegression} \)</i
          >
        </p>
        <p>
          Note: \(x_i\) refers to a data point from your feature(s) therefore
          it's treated as a constant not a variable! Our Variables are θ.
        </p>
        <p>3. Chain rule</p>
        <p>$$ g(x) = h_\theta(x_i) - y_i $$</p>
        <p>$$ f(x) = g(x)^2 $$</p>
        <p>$$ {d3ChainRule} $$</p>
        <p>$$ {derivativeChainRule} $$</p>
        <p>Apply power rule</p>
        <p>$$ {dPower} $$</p>
        <p>Do partial derivative</p>
        <!-- TODO: do partial derivative -->
        <p>$$ {partialDeriv0} $$</p>
        <p>$$ = 1 + 0 - 0 $$</p>
        <p>$$ {evaluatedPartialDeriv0} $$</p>
        <p>$$ {partialDeriv1} $$</p>
        <p>$$ = 0 + x - 0 $$</p>
        <p>$$ {evaluatedPartialDeriv1} $$</p>
        <p>Notice we can cancel out the 2's!</p>
        <p>
          Now to plug it all back into the original gradient descent algorithm
        </p>
        <i>repeat until convergence &lbrace;</i>
        <span>$$ {updateTheta0} $$</span>
        <span>$$ {updateTheta1} $$</span>
        <i>&rbrace;</i>
      </div>
    </article>
  </section>
</div>
