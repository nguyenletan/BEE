const IRR = (values, guess) => {
  // Calculates the resulting amount
  const irrResult = function (values, dates, rate) {
    const r = rate + 1
    let result = values[0]
    for (let i = 1; i < values.length; i++) {
      result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365)
    }
    return result
  }

  // Calculates the first derivation
  const irrResultDeriv = function (values, dates, rate) {
    const r = rate + 1
    let result = 0
    for (let i = 1; i < values.length; i++) {
      const frac = (dates[i] - dates[0]) / 365
      result -= frac * values[i] / Math.pow(r, frac + 1)
    }
    return result
  }

  // Initialize dates and check that values contains at least one positive value and one negative value
  const dates = []
  let positive = false
  let negative = false
  for (let i = 0; i < values.length; i++) {
    dates[i] = (i === 0) ? 0 : dates[i - 1] + 365
    if (values[i] > 0) positive = true
    if (values[i] < 0) negative = true
  }

  // Return error if values does not contain at least one positive value and one negative value
  if (!positive || !negative) return '#NUM!'

  // Initialize guess and resultRate
  let resultRate = (typeof guess === 'undefined') ? 0.1 : guess

  // Set maximum epsilon for end of iteration
  const epsMax = 1e-10

  // Set maximum number of iterations
  const iterMax = 50

  // Implement Newton's method
  let newRate, epsRate, resultValue
  let iteration = 0
  let contLoop = true
  do {
    resultValue = irrResult(values, dates, resultRate)
    newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate)
    epsRate = Math.abs(newRate - resultRate)
    resultRate = newRate
    contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax)
  } while (contLoop && (++iteration < iterMax))

  if (contLoop) return '#NUM!'

  // Return internal rate of return
  return resultRate
}

export default IRR
