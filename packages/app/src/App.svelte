<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Example from "./pages/example.svelte";
  import Index from "./pages/index.svelte";
</script>

<main>
  <Router>
    <Route path="/" component={Index} />
    <Route path="/example" component={Example} />
  </Router>
</main>
