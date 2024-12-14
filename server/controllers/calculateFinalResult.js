// Function to calculate the average score
function calculateFinalResult(scores) {
  const {
    sleepscore = 0,
    wakeupscore = 0,
    dayrestscore = 0,
    chantingscore = 0,
    hearingscore = 0,
    readingscore = 0,
    servicescore = 0,
  } = scores;

  // Calculate the average as a float
  const totalScore =
    sleepscore +
    wakeupscore +
    dayrestscore +
    chantingscore +
    hearingscore +
    readingscore +
    servicescore;

  const averageScore = (totalScore * 100) / 175;

  // Return the average as an integer
  return Math.floor(averageScore);
}

module.exports = {
  calculateFinalResult,
};
