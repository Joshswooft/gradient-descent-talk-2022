<svelte:options namespace="svg" />

<script>
  export let x, y;
</script>

<!-- boundary box of the grid -->
<rect
  x="0"
  y="0"
  width="1400"
  height="1800"
  stroke="#ccc"
  style="opacity: 0.5"
  fill="none"
  stroke-width="2"
  class="grid-boundaries"
/>

{#each { length: 8 } as _, i}
  {#if i < 6}
    <!-- vertical grid lines -->
    <path d="M{(i + 1) * 200} 0 L{(i + 1) * 200} 1802" class="grid-line" />
  {/if}
  <!-- horizontal grid lines  -->
  <path d="M0 {(i + 1) * 200} L1400 {(i + 1) * 200} " class="grid-line" />
{/each}

<!-- the x axis red line that goes across -->
<path
  style="transform: translateX({x + 200}px)"
  d="M0 0 L0 1800"
  class="grid-line-xy"
/>
<!-- the y axis red line  -->
<path
  style="transform: translateY({y}px)"
  d="M0 400 L1400 400"
  class="grid-line-xy"
/>

<style>
  .grid-line {
    stroke: #ccc;
    opacity: 0.5;
    stroke-width: 0.8;
  }

  .grid-line-xy {
    stroke: tomato;
    stroke-width: 5;
  }
</style>
