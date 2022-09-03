<script lang="ts">
  import Divider from "../components/Divider.svelte";
  import BurgerMenu from "svelte-burger-menu";
  import TitleFold from "../components/sections/TitleFold.svelte";
  import WhyMathsFold from "../components/sections/WhyMathsFold.svelte";
  import Basics from "./basics.svelte";
  import Costfunction from "./costfunction.svelte";
  import Gradientdescent from "./gradientdescent.svelte";
  import * as animateScroll from "svelte-scrollto";

  function goToHome() {
    animateScroll.scrollToTop();
  }

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

<main>
  <div class="fixed" id="burger-menu-container" style="z-index: 3">
    <BurgerMenu
      id="burger-menu"
      backgroundColor="#0175ff"
      menuColor="white"
      paddingTop="70px"
    >
      <button class="block py-2" on:click={goToHome}>Home</button>
      <button class="block py-2" on:click={goToBasics}>Basics</button>
      <button class="block py-2" on:click={goToCostFunction}
        >Cost function</button
      >
      <button class="block py-2" on:click={goToGD}>Gradient descent</button>
    </BurgerMenu>
  </div>
  <div id="content">
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
  </div>
</main>
