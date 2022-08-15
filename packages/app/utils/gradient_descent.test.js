import { expect, test } from "vitest";
import meanSquareError from "./mse";
import testdata from "../../../data/testdata.json";
import gradientDescent from "./gradient_descent";
import { matrix, ones, transpose, zeros } from "mathjs";

test("it calculates the correct parameter values to minimise the costFn (mse)", () => {
  const costFn = meanSquareError;

  const x = testdata.map((td) => td.X);
  const y = matrix(
    testdata.map((td) => td.Y),
    "sparse"
  );

  let X = matrix([ones(x.length), x]);
  X = transpose(X);

  const theta = zeros(2, 1);

  const { t, Jerror } = gradientDescent(X, y, theta, 0.01, 1500, costFn);

  const expectedTheta = matrix([[-3.630291], [1.166362]], "dense");
  const expectedLastError = "4.483388";

  const actual = t.map(function (value) {
    return +value.toPrecision(7);
  });

  const actualLastError = Jerror[Jerror.length - 1];

  expect(actual).eql(expectedTheta);
  expect(actualLastError.toPrecision(7)).eql(expectedLastError);

  expect(
    Jerror[0],
    "expected the 1st error to be bigger than the last"
  ).toBeGreaterThan(actualLastError);
});
