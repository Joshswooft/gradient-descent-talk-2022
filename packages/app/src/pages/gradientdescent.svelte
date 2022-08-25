<script>
  import VisualizeGradDesc from "../components/VisualizeGradDesc.svelte";
</script>

<svelte:head>
  <script
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
</svelte:head>

<section>
  <h1>Gradient descent</h1>
  <p>
    We can think of gradient descent as an optimiser where it's trying to find
    the minimum value for some function.
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
  <p>Here's an example of a convex function:</p>
  <p>$$y = (x - 20)^2 + c $$</p>
  <VisualizeGradDesc />

  <h2>So how do we find the point where the error is the least?</h2>
  <p>
    We can't plot each point because there is infinite amount of positions we
    can go and although we can make some guesstimates based on the data this
    would be un-feasible when dealing with higher dimensionality data!
  </p>
  <p>The solution here is to use some maths!</p>
  <p>All we need to do is follow the slope to the lowest point!</p>
  <p>
    You might remember from school that to calculate the <b>average</b> slope we
    do:
  </p>
  <p>$$slope = change \: in \: y / change \: in \: x = \Delta y /\Delta x$$</p>
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
    So taking our previous example of the $$y = (x - 20)^2 + c $$ lets calculate
    the derivative for this function. (Note: calculating the derivative is
    called differentiation).
  </p>
  <p>$$ ((x + Δx - 20)^2 - (x-20)^2) / Δx $$</p>
  <p>Note the derivative of a constant is 0.</p>
  <p>Expand</p>
  <p>
    $$ ([x^2 + xΔx -20x + xΔx + Δx^2 - 20Δx - 20x -20Δx + 400 ] - [x^2 - 40x +
    400]) / Δx $$
  </p>
  <p>Simplify</p>
  <p>$$ ([x^2 + 2xΔx + Δx^2 - 40x - 40Δx + 400] - [x^2 - 40x + 400]) / Δx $$</p>
  <p>Cancel out terms</p>
  <p>$$ (Δx^2 + 2xΔx - 40Δx) / Δx $$</p>
  <p>Divide and rearrange</p>
  <p>$$ 2(x - 20) + Δx $$</p>
  <p>Δx heads towards 0</p>
  <p>$$ 2(x - 20) $$</p>
</section>

<section>
  <h1>Introducing alpha</h1>
  <p>\(\alpha\) is our learning rate.</p>
  <h2>Common problems</h2>
  <p>If \(\alpha\) is too <b>small</b>, gradient descent can be slow.</p>
  <p>
    If \(\alpha\) is too <b>large</b>, then gradient descent can overshoot the
    minimum. It may fail to converge and even diverge!
  </p>
  <p>
    Note: Gradient descent can converge to a local minimum even with the
    learning rate fixed. This is because as we approach the minimum the slope
    will be smaller so we automatically take smaller steps.
  </p>
  <!-- TODO: Show how small/large alpha affects learning -->
</section>
