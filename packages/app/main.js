import './style.css'
import plotScatterDiagram from './src/plot_scatter';

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`

async function main() {
  const canvas = document.getElementById("canvas");
  
  if (!canvas.getContext) {
    return;
  }
  
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  
  console.log("w: ", w);
  console.log("H: ", h);
  
  // get the context
  let ctx = canvas.getContext('2d');
  
  // TODO: move endpoint to .env
  const jsonUrl = 'http://localhost:8080/data'
  await plotScatterDiagram('scatter_plot', jsonUrl);
  
}

await main();