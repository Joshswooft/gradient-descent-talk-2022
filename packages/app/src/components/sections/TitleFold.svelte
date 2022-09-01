<script lang="ts">
  export let onCallToActionHandler;
  export let showCallToActionButton: boolean = true;

  import { link } from "svelte-spa-router";
  import { fade, fly } from "svelte/transition";
</script>

<div class={"flex justify-center items-center h-full"}>
  <div class="text-center">
    <span id="sub-title">A Maths introduction to Machine Learning - Part 1</span
    >
    <h1>Linear Regression</h1>
    <nav class="my-5">
      <a href="/basics" use:link>Learn the basics</a>
      <a href="/costfunction/" use:link>Mean Square Error</a>
      <a href="/gradientdescent/" use:link>Gradient Descent</a>
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
