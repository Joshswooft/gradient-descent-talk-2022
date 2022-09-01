<script>
  export let m = 2; // gradient
  export let c = 1; // y-intercept
</script>

<div id="controls">
  <div class="slider">
    <input bind:value={m} id="gradient-slider" type="range" min="0" max="5" />
    <input
      bind:value={c}
      id="y-intercept-slider"
      type="range"
      min="0"
      max="5"
    />
  </div>
</div>
