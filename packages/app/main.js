import './style.css'

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`

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


// TODO: 