<script lang="ts">
  import Router from "svelte-spa-router";
  import { routes } from "./pages/routes.config";
</script>

<main>
  <Router {routes} />
  <div class="mockup-code">
    <pre data-prefix="$"><code>npm i daisyui</code></pre>
    <pre data-prefix=">" class="text-warning"><code>installing...</code></pre>
    <pre data-prefix=">" class="text-success"><code>Done!</code></pre>
  </div>
</main>
