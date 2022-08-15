import { matrix, ones, transpose, zeros } from "mathjs";
import testdata from "../../../data/testdata.json";
import computeCost from "./compute_cost";
import meanSquareError from "./mse";

import { expect, test } from "vitest";

test("calculates the mean square error", () => {
  const expectedResponse = 32.0727;

  const x = testdata.map((td) => td.X);
  const y = matrix(
    testdata.map((td) => td.Y),
    "sparse"
  );

  let X = matrix([ones(x.length), x]);
  X = transpose(X);

  const theta = zeros(2, 1);

  const actual = computeCost(X, y, theta, meanSquareError);

  expect(actual.toFixed(4)).eq(expectedResponse.toFixed(4));
});
