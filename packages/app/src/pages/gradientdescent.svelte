<script>
  import GdCodeBlock from "../components/codeBlocks/GDCodeBlock.svelte";
  import CodeBlock from "../components/codeBlocks/CodeBlock.svelte";
  import VisualizeGradDesc from "../components/VisualizeGradDesc.svelte";
  import { chainRule, modifiedMse, powerRule } from "../utils/equations";
  import { simpleLinearRegression } from "../utils/equations";
  import AlphaPlot from "../components/AlphaPlot.svelte";
  import Scroller from "../lib/Scroller.svelte";
  import Divider from "../components/Divider.svelte";
  import surfacePlotImg from "../../static/surface_plot.png";
  import slope1Img from "../../static/slope-dy-dx.svg";
  import slope2Img from "../../static/slope-dy-dx2.svg";

  const Jcost = `J(θ_0, θ_1)`;
  const simpleCostFnExample = `J(θ) = ${Jcost} = θ_0^2 + 3θ_1^2`;
  const simpleGradTheta1 = `\\( θ_0 := θ_0 - \\alpha\\frac{∂}{∂_1}${Jcost} \\)`;
  const simpleGradTheta2 = `\\( θ_1 := θ_1 - \\alpha\\frac{∂}{∂_2}${Jcost} \\)`;
  const partial = (x) => `\\frac{∂}{∂θ_${x}}`;
  const partialJ = (x) => `${partial(x)}${Jcost} = `;
  const simpleJDerivative = (x) =>
    `${partialJ(x)}${partial(0)}θ_0^2 + ${partial(1)}3θ_1^2 = `;

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
  )} { \\frac {1}{2n}} \\sum_{i=1}^{n}2(${gx})x_1`;

  const updateTheta0 = `θ_0 := θ_0 - \\alpha( { \\frac {1}{n}} \\sum_{i=1}^{n}${gx} )`;
  const updateTheta1 = `θ_1 := θ_1 - \\alpha( {\\frac {1}{n}} \\sum_{i=1}^{n}(${gx})x_1 )`;

  $: progress = 0;
  const progressThreshold = 0.2;

  $: playGradientDescentGraphAnim = progress > progressThreshold;
  let scrollDirection = 0;

  function onWheel(evt) {
    scrollDirection = evt.deltaY;
  }

  const dydxEquation = `Δy/Δx = f(x+Δx) − f(x) /Δx`;
</script>

<svelte:head>
  <script
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
  ></script>
</svelte:head>

<svelte:window on:mousewheel={onWheel} />

<div class="text-left py-8">
  <Scroller splitscreen={true}>
    <div slot="background">
      <!-- background should contain the graphics -->
      <div>
        <div class="px-2">
          <img
            width="500px"
            class="mx-auto mb-8"
            src={surfacePlotImg}
            alt="surface plot"
          />
          <img
            class="mx-auto my-12"
            src={slope1Img}
            alt="slope showing dy/dx"
          />
          <img
            class="mx-auto my-12"
            src={slope2Img}
            alt="slope showing f(x + h)"
          />
        </div>
      </div>
    </div>
    <div slot="foreground">
      <section class="section-container">
        <article class="pl-12 prose">
          <h1 id="gradient-descent-title" class="mb-8 border-b-2">
            Gradient descent
          </h1>
          <p>
            We can think of gradient descent as an <b>optimiser</b> where it's trying
            to find the minimum value for some function.
          </p>
          <p>
            The idea is to find the minimum value of our cost function (MSE) as
            this will be where the error is the least and will provide us with
            the best predictions.
          </p>
          <p>
            The key for gradient descent to work is that our cost function must
            be a convex function which has a global minimum.
          </p>
          <h2>So how do we find the point where the error is the least?</h2>
          <p>
            We can't plot each point because there is infinite amount of
            positions we can go and although we can make some guesstimates based
            on the data this would be un-feasible when dealing with higher
            dimensionality data!
          </p>
          <p>The solution here is to use some maths!</p>
          <p>All we need to do is follow the slope to the lowest point!</p>
          <p>
            You might remember from school that to calculate the <b>average</b> slope
            we do:
          </p>
          <CodeBlock>
            <p>
              $$slope = change \: in \: y / change \: in \: x = \Delta y /\Delta
              x$$
            </p>
            <p>$$ slope = (y_2 - y_1) / (x_2 - x_1) $$</p>
          </CodeBlock>
          <p>
            If we look at the above graph again you will notice that the
            gradient or slope of the line is practically 0 at the lowest point!
            Unfortantely calculating the slope at a point doesn't work!
          </p>
          <CodeBlock>
            <p>$$ slope = \Delta y /\Delta x = 0/0 = ???$$</p>
          </CodeBlock>
          <p>
            Instead what we do is calculate something called the derivative. You
            can think of this as being a very small difference in the slope that
            shrinks towards zero! The equation becomes this:
          </p>
          <p>$$ {dydxEquation} $$</p>
          <p>y changes to $$ y = f(x + Δx) $$</p>
          <p>x changes to $$ x = x + Δx $$</p>
        </article>
      </section>
    </div>
  </Scroller>
  <Divider />
  <Scroller splitscreen={true} bind:progress top={0.1}>
    <div slot="background">
      <div>
        <VisualizeGradDesc
          shouldPlay={playGradientDescentGraphAnim}
          reverse={scrollDirection < 0}
        />
        <p class="text-center">Here's an example of a convex function:</p>
        <p>$$y = (x - 20)^2 + c $$</p>
        <p class="text-center">Here's the previous equation as a reminder:</p>
        <p>$$ {dydxEquation} $$</p>
      </div>
    </div>
    <div slot="foreground">
      <section style="height: 100vh;" class="section-container">
        <article class="pl-12 prose">
          <h1 id="gradient-descent-title" class="mb-8 border-b-2">
            Derivative example
          </h1>
          <p>
            We will use the line \(y = (x - 20)^2 + c \) as our example to
            calculate the derivative for. <span class="italic"
              >(Note: calculating the derivative is called differentiation).</span
            >
          </p>
          <p>$$ ((x + Δx - 20)^2 - (x-20)^2) / Δx $$</p>
          <p class="italic">Note: the derivative of a constant is 0.</p>
          <p>Expand</p>
          <p>
            $$ ([x^2 + xΔx -20x + xΔx + Δx^2 - 20Δx - 20x -20Δx + 400 ] - [x^2 -
            40x + 400]) / Δx $$
          </p>
          <p>Simplify</p>
          <p>
            $$ ([x^2 + 2xΔx + Δx^2 - 40x - 40Δx + 400] - [x^2 - 40x + 400]) / Δx
            $$
          </p>
          <p>Cancel out terms</p>
          <p>$$ (Δx^2 + 2xΔx - 40Δx) / Δx $$</p>
          <p>Divide and rearrange</p>
          <p>$$ 2(x - 20) + Δx $$</p>
          <p>Δx heads towards 0</p>
          <p class="text-center">\( 2(x - 20) \)</p>
        </article>
      </section>
    </div>
  </Scroller>
  <Divider />
  <Scroller splitscreen={true}>
    <div slot="background">
      <AlphaPlot />
    </div>
    <div slot="foreground">
      <section style="height: 100vh;" class="section-container">
        <article class="prose pl-12">
          <h1 class="mt-12 mb-8 border-b-2">Introducing alpha</h1>
          <p class="mb-12">
            <span class="font-bold"
              >Alpha ( \(\alpha\) ) is our learning rate.</span
            > You can think of it as a force that pushes the ball in the direction
            it needs to go.
          </p>
          <p class="my-4">Common problems:</p>
          <ul class="ml-2 mb-16">
            <li>
              If \(\alpha\) is too <b>small</b>, gradient descent can be slow.
            </li>
            <li>
              If \(\alpha\) is too <b>large</b>, then gradient descent can
              overshoot the minimum. It may fail to converge and even diverge!
            </li>
          </ul>
          <p class="italic">
            Note: Gradient descent can converge to a local minimum even with the
            learning rate fixed. This is because as we approach the minimum the
            slope will be smaller so we automatically take smaller steps.
          </p>
        </article>
      </section>
    </div>
  </Scroller>
  <Divider />
  <Scroller splitscreen={true}>
    <div slot="background">
      <div class="w-1/2 left-1/2 ml-auto">
        <div class="text-center mt-16 top-10">
          <p class="mb-4">Derivative Rules</p>
          <ul>
            <li>The power rule: \({powerRule}\)</li>
            <li>Constant: \(f(x) = c, f'(x) = 0\)</li>
            <li>Line: \(f(x) = x, f'(x) = 1\)</li>
            <li>Multiplication by constant: \( cf => cf' \)</li>
            <li>Sum rule: \( f + g => f' + g' \)</li>
            <li>Chain rule: \({chainRule} \)</li>
          </ul>
        </div>
      </div>
    </div>
    <div slot="foreground">
      <section class="section-container">
        <article class="pl-12 prose mb-10">
          <h1 class="mt-12 mb-8 border-b-2">Gradient descent algorithm</h1>
          <GdCodeBlock />
          <p>Remember that:</p>
          <ul>
            <li>\(\alpha\) is our learning rate.</li>
            <li>\(θ\) = parameters</li>
            <li>\(j\) = number of parameters</li>
            <li>
              \(∂\) is used to identify partial derivative variables. \(∂\) is
              called 'dee'
            </li>
          </ul>
          <p>A partial derivative whats that?</p>
          <p>
            Partial derivatives tell you how a multivariable function changes as
            you tweak just one of the variables in its input. The reason for a
            new type of derivative is that when the input of a function is made
            up of multiple variables, we want to see how the function changes as
            we let just one of those variables change while holding all the
            others constant.
          </p>
          <i
            >∂ = partial derivative. Basically we do the derivative on the
            variable we wish to look at whilst holding the other variable
            constant, meaning it disappears when we calculate the derivative.</i
          >
          <h2>Patial derivative example</h2>
          <p>
            For a simple example, lets assume our cost function looks like this:
            \({simpleCostFnExample}\)
          </p>
          <p>Notice how it's made up of two variables \(θ_0\) and \(θ_1\).</p>
          <p>Our gradient descent algorithm would therefore look like this:</p>
          <GdCodeBlock
            alg={`<p>${simpleGradTheta1}</p>
          <p>${simpleGradTheta2}</p>`}
          />

          <p>Now we calculate the partial derivatives of these 2 equations:</p>
          <CodeBlock>
            <p>$$ {simpleJDerivative(0)} $$</p>
            <p>$$ {partial(0)}θ_0^2 + 0 = 2θ_0$$</p>
            <p>$$ {simpleJDerivative(1)} $$</p>
            <p>$$ 0 + {partial(1)}3θ_1^2 = 6θ_1$$</p>
          </CodeBlock>
          <CodeBlock>
            <p>$$ {simpleJDerivative(0)} 2θ_0$$</p>
            <p>$$ {simpleJDerivative(1)} 6θ_1$$</p>
          </CodeBlock>
          <p>
            Lets stick this back into our original gradient descent algorithm to
            see how it all looks together!
          </p>
          <GdCodeBlock
            alg={`<p>\\( θ_0 := θ_0 - \\alpha2θ_0 \\)</p>
          <p>\\( θ_1 := θ_1 - \\alpha6θ_1 \\)</p>`}
          />
          <p>
            Now lets figure out how we do gradient descent with our actual cost
            function MSE!
          </p>
          <p>
            Here's the formulae below for those who can't remember
            <CodeBlock>
              <span>$$ {Jcost} = {modifiedMse} $$</span>
            </CodeBlock>
            For those who are observant will notice we are using the modified MSE
            with the 2n term which is going to become clear pretty soon on why we
            do that.
          </p>
          <div>
            <CodeBlock>
              <p>$$ {Jcost} = {modifiedMse} $$</p>
            </CodeBlock>
            <p>$$ {partial(0)}{Jcost}$$</p>
            <p>
              We are trying to work out the derivative of the above cost
              function!
            </p>
            <p>1. Apply the sum rule</p>
            <p>1. \({d1} \)</p>
            <p>2. Multiplication by constant</p>
            <p>2. \( {d2} \)</p>
            <p>
              Substitute <i
                >\({yHat}\) for hypothesis: \( {simpleLinearRegression} \)</i
              >
            </p>
            <p class="italic">
              Note: \(x_i\) refers to a data point from your feature(s)
              therefore it's treated as a constant not a variable! Our Variables
              are θ.
            </p>
            <p>3. Chain rule</p>
            <p>$$ g(x) = h_\theta(x_i) - y_i $$</p>
            <p>$$ f(x) = g(x)^2 $$</p>
            <p>$$ {d3ChainRule} $$</p>
            <p>$$ {derivativeChainRule} $$</p>
            <p>Apply power rule</p>
            <p>$$ {dPower} $$</p>
            <p>Do partial derivative</p>
            <p>$$ {partialDeriv0} $$</p>
            <p>$$ = 1 + 0 - 0 $$</p>
            <p>$$ {evaluatedPartialDeriv0} $$</p>
            <p>$$ {partialDeriv1} $$</p>
            <p>$$ = 0 + x - 0 $$</p>
            <p>$$ {evaluatedPartialDeriv1} $$</p>
            <p>Notice we can cancel out the 2's!</p>
            <p class="mb-4">
              Now to plug it all back into the original gradient descent
              algorithm
            </p>
            <GdCodeBlock
              alg={`<div>
              <p>\\( ${updateTheta0} \\) </p>
              <p>\\( ${updateTheta1} \\) </p>
              </div>`}
            />
          </div>
        </article>
      </section>
    </div>
  </Scroller>
</div>
