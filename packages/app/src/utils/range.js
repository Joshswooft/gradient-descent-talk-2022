// fills array with values from start to end
// e.g. range(-2, 3) produces [-2, -1, 0, 1, 2, 3]
export default function range(start, end, step = 1) {
  const len = Math.floor((end - start) / step) + 1;
  return Array(len)
    .fill()
    .map((_, idx) => start + idx * step);
}
