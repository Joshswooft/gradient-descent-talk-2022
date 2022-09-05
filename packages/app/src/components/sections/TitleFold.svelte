<script lang="ts">
  export let onCallToActionHandler;
  export let showCallToActionButton: boolean = true;

  import { link } from "svelte-spa-router";
  import { fade, fly } from "svelte/transition";

  import * as animateScroll from "svelte-scrollto";

  function goToBasics() {
    animateScroll.scrollTo({ element: "#basics-title", duration: 2000 });
  }

  function goToCostFunction() {
    animateScroll.scrollTo({ element: "#cost-function-title", duration: 2000 });
  }

  function goToGD() {
    animateScroll.scrollTo({
      element: "#gradient-descent-title",
      duration: 2000,
    });
  }
</script>

<div class={"flex justify-center items-center h-full"}>
  <div class="text-center">
    <span id="sub-title">A Maths introduction to Machine Learning - Part 1</span
    >
    <h1>Linear Regression</h1>
    <nav class="my-5">
      <button on:click={goToBasics}>Learn the basics</button>
      <button on:click={goToCostFunction}>Mean Square Error</button>
      <button on:click={goToGD}>Gradient Descent</button>
    </nav>
  </div>
  {#if showCallToActionButton}
    <button
      class={"absolute bottom-5"}
      in:fly
      out:fade
      on:click={onCallToActionHandler}>Click me</button
    >
  {/if}
</div>
