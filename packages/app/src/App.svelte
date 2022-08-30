<script lang="ts">
  import Router from "svelte-spa-router";
  import { routes } from "./pages/routes.config";
</script>

<main class="p-10 mx-auto max-w-screen-xl">
  <Router {routes} />
</main>
