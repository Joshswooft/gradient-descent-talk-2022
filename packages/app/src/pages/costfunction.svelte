<script>
  const mse = `$$ {MSE} ={\\frac {1}{n}}\\sum_{i=1}^{n}\\left(Y_{i}-{\\hat {Y_{i}}}\\right)^{2} $$`;
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
<p>{mse}</p>
<p>
  One thing to note about MSE is that it does not perform well with outliers -
  This is the result of squaring each term, which effectively weights large
  errors more heavily than small ones.
</p>
