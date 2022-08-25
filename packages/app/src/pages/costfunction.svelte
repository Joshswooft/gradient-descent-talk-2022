<script>
  import { mse, modifiedMse } from "../utils/equations";
</script>

<svelte:head>
  <script
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
  </script>
</svelte:head>

<h1>Cost function</h1>
<ul>
  <li>Allows models to analyze how well it fits the data.</li>
  <li>Returns the cost which is the degree of error.</li>
  <li>Greater the cost => more error</li>
</ul>
<p>
  The formula that we will be using as our cost function is known as mean
  squared error.
</p>
<p>$$ {mse} $$</p>
<span>n = number of training examples</span>
<p>
  One thing to note about MSE is that it does not perform well with outliers -
  This is the result of squaring each term, which effectively weights large
  errors more heavily than small ones.
</p>
<p>$$ {modifiedMse} $$</p>
<p>
  We use a slightly modified MSE (notice the 2n term). The reason for this is it
  makes the maths easier when it comes to differentiation.
</p>
