<script lang="ts">
  import Divider from "../components/Divider.svelte";

  import TitleFold from "../components/sections/TitleFold.svelte";
  import WhyMathsFold from "../components/sections/WhyMathsFold.svelte";
  import Basics from "./basics.svelte";
  import Costfunction from "./costfunction.svelte";
  import Gradientdescent from "./gradientdescent.svelte";
</script>

<main>
  <div class="h-screen">
    <TitleFold onCallToActionHandler showCallToActionButton={false} />
  </div>
  <Divider />
  <div class="h-screen">
    <WhyMathsFold opacity={100} />
  </div>
  <Divider />
  <Basics />
  <Divider />
  <Costfunction />
  <Divider />
  <Gradientdescent />
</main>
