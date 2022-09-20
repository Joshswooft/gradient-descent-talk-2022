<script>
  import GdCodeBlock from "./GDCodeBlock.svelte";

  const gx = `h_θ(x_i) - y_i`;

  const updateTheta0 = `θ_0 := θ_0 - \\alpha( { \\frac {1}{n}} \\sum_{i=1}^{n}${gx} )`;
  const updateTheta1 = `θ_1 := θ_1 - \\alpha( {\\frac {1}{n}} \\sum_{i=1}^{n}(${gx})x_1 )`;
</script>

<GdCodeBlock
  alg={`<div>
              <p>\\( ${updateTheta0} \\) </p>
              <p>\\( ${updateTheta1} \\) </p>
              </div>`}
/>
