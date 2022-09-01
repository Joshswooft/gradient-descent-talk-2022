<script lang="ts">
  import TitleFold from "../components/sections/TitleFold.svelte";
  import WhyMathsFold from "../components/sections/WhyMathsFold.svelte";
</script>

<main>
  <div class="h-screen">
    <TitleFold onCallToActionHandler showCallToActionButton={false} />
  </div>
  <div class="h-screen">
    <WhyMathsFold opacity={100} />
  </div>
</main>
