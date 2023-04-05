<script>
  import CodeBlock from "./CodeBlock.svelte";
  import { gradientDescentAlg } from "../../utils/equations";

  export let alg = `\\(${gradientDescentAlg}\\)`;
</script>

<CodeBlock>
  <i>repeat until convergence &lbrace;</i>
  <div class="text-left ml-5">
    {@html alg}
  </div>
  <i>&rbrace;</i>
</CodeBlock>
