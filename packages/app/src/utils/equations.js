export const simpleLinearRegression = `h(x) = \\theta_0 + \\theta_1x_1`;
export const multiVariableLinearRegression = `h(x) = \\theta_0 + \\theta_1x_1 +
\\theta_2x_2 + ... + \\theta_nx_n`;
export const gradientDescentAlg = `θ_j := θ_j - \\alpha\\frac{∂}{∂_j}J(θ_0, θ_1)`;
export const mse = `{MSE} ={\\frac {1}{n}}\\sum_{i=1}^{n}\\left(Y_{i}-{\\hat {Y_{i}}}\\right)^{2}`;
export const modifiedMse = `{MSE} = {\\frac {1}{2n}}\\sum_{i=1}^{n}\\left(Y_{i}-{\\hat {Y_{i}}}\\right)^{2}`;

// derivative rules
export const powerRule = `f(x) = x^n, f'(x) = nx^{n-1}`;
export const chainRule = `\\frac {d}{dx}f(g(x)) = f'(g(x))g'(x)`;
