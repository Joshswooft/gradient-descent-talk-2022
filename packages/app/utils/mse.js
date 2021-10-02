// y_hat is the predicted y value
// y is the actual value
// returns: the mean square error
function meanSquareError(y_hat, y) {
    if (y.length != y_hat.length) {
        throw new Error("length of predicted values doesnt match output values length")
    }
    let error = 0
	for (let i = 0; i < y.length; i++) {
		error += Math.pow((y_hat[i] - y[i]), 2)
	}
	return error / a.length
}

module.exports = meanSquareError;