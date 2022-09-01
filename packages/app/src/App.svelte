<script lang="ts">
  import Router from "svelte-spa-router";
  import { routes } from "./pages/routes.config";
</script>

<main>
  <Router {routes} />
</main>
