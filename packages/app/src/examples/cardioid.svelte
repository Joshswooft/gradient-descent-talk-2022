<script>
  import { onMount } from "svelte";
  import { Canvas, Layer } from "svelte-canvas";

  let canvas, ctx;
  let r; //radius
  let lines = 100; //number of lines
  let variant = 0;

  //   let width = 640;
  //   let height = 640;

  onMount(() => {
    ctx = canvas.getContext("2d");
    console.log("ctx: ", ctx);
    // init(ctx);
  });

  //   function init(ctx) {
  //     r = width / 2 - 40;
  //     ctx.translate(width / 2, height / 2);
  //     render(ctx, width, height);
  //   }

  const setup = ({ context, width, height }) => {
    console.log("width: ", width, "height: ", height);
    r = width / 2 - 40;
    context.translate(width / 2, height / 2);
  };

  function line(ctx, v1, v2) {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(92, 18, 206, 0.8)";
    ctx.moveTo(v1.x, v1.y);
    ctx.lineTo(v2.x, v2.y);
    ctx.stroke();
    ctx.closePath();
  }

  $: render = ({ context: ctx, width, height }) => {
    if (!ctx) {
      return;
    }
    ctx.fillStyle = "black";
    ctx.fillRect(-width / 2, -height / 2, width, height);

    ctx.lineWidth = "0.8";
    for (let i = 0; i < lines; i++) {
      //angles determining first and second point
      var angle = ((2 * Math.PI) / lines) * i + Math.PI;
      var angle2 = ((2 * Math.PI) / lines) * ((variant * i) % lines) + Math.PI;

      //Coordinates of first(x,y) and second(x2,y2) point on circle
      var x = r * Math.cos(angle);
      var y = r * Math.sin(angle);
      var x2 = r * Math.cos(angle2);
      var y2 = r * Math.sin(angle2);

      line(ctx, { x, y }, { x: x2, y: y2 });
    }

    variant += 0.01;
    // window.requestAnimationFrame(render);
  };

  function render() {
    //Clear canvas

    if (!ctx) {
      return;
    }

    console.log("c: ", ctx);
    ctx.fillStyle = "black";
    ctx.fillRect(-width / 2, -height / 2, width, height);

    ctx.lineWidth = "0.8";
    for (let i = 0; i < lines; i++) {
      //angles determining first and second point
      var angle = ((2 * Math.PI) / lines) * i + Math.PI;
      var angle2 = ((2 * Math.PI) / lines) * ((variant * i) % lines) + Math.PI;

      //Coordinates of first(x,y) and second(x2,y2) point on circle
      var x = r * Math.cos(angle);
      var y = r * Math.sin(angle);
      var x2 = r * Math.cos(angle2);
      var y2 = r * Math.sin(angle2);

      line(ctx, { x, y }, { x: x2, y: y2 });
    }

    variant += 0.01;
    window.requestAnimationFrame(render);
  }
</script>

<Canvas bind:this={canvas} id="cardioid">
  <Layer {setup} {render} />
</Canvas>
