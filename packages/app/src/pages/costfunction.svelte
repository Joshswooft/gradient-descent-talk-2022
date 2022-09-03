<script>
  import Scroller from "../lib/Scroller.svelte";
  import CodeBlock from "../components/CodeBlock.svelte";
  import SurfacePlot from "../components/SurfacePlot.svelte";
  import { mse, modifiedMse } from "../utils/equations";
</script>

<svelte:head>
  <script
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
  </script>
</svelte:head>

<Scroller splitscreen={true} bottom={0.7}>
  <div slot="background">
    <SurfacePlot />
  </div>
  <div slot="foreground">
    <section>
      <article class="prose pl-12">
        <h1 id="cost-function-title" class="mb-8 border-b-2">Cost function</h1>
        <ul>
          <li>Allows models to analyze how well it fits the data.</li>
          <li>Returns the cost which is the degree of error.</li>
          <li>Greater the cost => more error</li>
        </ul>
        <p>
          The formula that we will be using as our cost function is known as
          mean squared error.
        </p>
        <CodeBlock>
          <p>$$ {mse} $$</p>
          <span>where n = number of training examples</span>
        </CodeBlock>
        <p>
          One thing to note about MSE is that it does not perform well with
          outliers - This is the result of squaring each term, which effectively
          weights large errors more heavily than small ones.
        </p>
        <CodeBlock>
          <p>$$ {modifiedMse} $$</p>
        </CodeBlock>
        <p>
          We use a slightly modified MSE (notice the 2n term). The reason for
          this is it makes the maths easier when it comes to differentiation.
        </p>
      </article>
    </section>
  </div>
</Scroller>
