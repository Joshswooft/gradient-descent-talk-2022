<script lang="ts">
  import { onMount } from "svelte";
  import { Parallax, ParallaxLayer, StickyLayer } from "svelte-parallax";
  import { fade, fly } from "svelte/transition";
  import { sineOut } from "svelte/easing";

  // TODO: asset/static folder?
  import PexelLight from "./pexel-light.png";

  // import plotScatterDiagram from "../plot_scatter";
  // import contourPlotExample from "../examples/contour_plot";
  // import gradientDescentMultiExample from "../examples/gradient_descent_multi";
  import { link } from "svelte-spa-router";
  import TitleFold from "../components/sections/TitleFold.svelte";
  import WhyMathsFold from "../components/sections/WhyMathsFold.svelte";

  onMount(async () => {
    // const jsonUrl = "http://localhost:8080/data";
    // await plotScatterDiagram("scatter_plot", jsonUrl);
    // gradientDescentMultiExample();
    // contourPlotExample("contour_plot_ex1");
  });

  let parallax;
  const parallaxConfig = { stiffness: 0.2, damping: 0.3 };

  let visible = true;

  const onCallToActionClick = () => {
    visible = false;

    parallax.scrollTo(4, {
      selector: ".why-maths",
      duration: 6000,
      easing: sineOut,
    });
  };
</script>

<main>
  <Parallax sections={3} config={parallaxConfig} bind:this={parallax}>
    <ParallaxLayer rate={0} span={1}>
      <TitleFold
        onCallToActionHandler={onCallToActionClick}
        showCallToActionButton={visible}
      />
    </ParallaxLayer>
    <ParallaxLayer
      rate={0.15}
      offset={1}
      span={1}
      let:progress
      style={"overflow: hidden"}
    >
      <img
        alt="bla"
        src={PexelLight}
        style={`transform: scale3d(${5 - progress * 5}, ${
          5 - progress * 2
        }, 1); background-repeat: no-repeat; rotate: 90deg; max-width: 100%; max-height: 100%; display: inline-block`}
      />
    </ParallaxLayer>
    <ParallaxLayer offset={2} span={1} rate={0.5} let:progress>
      <WhyMathsFold opacity={progress * 3} />
    </ParallaxLayer>
    <!-- <div id="scatter_plot" />
    <div id="learning_plot" />
    <div id="contour_plot_ex1" /> -->
  </Parallax>
</main>
