import GradientDescent from "./gradientdescent.svelte";
import Basics from "./basics.svelte";
import Index from "./index.svelte";
import CostFunction from "./costfunction.svelte";

export const routes = {
    "/": Index,
    "/basics": Basics,
    "/gradientdescent": GradientDescent,
    "/costfunction": CostFunction,
};