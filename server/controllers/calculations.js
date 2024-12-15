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

function calculateScores(report) {
  let sleepscore,
    wakeupscore,
    dayrestscore,
    chantingscore,
    hearingscore,
    readingscore,
    servicescore;

  // Sleep score based on sleep time (assuming the time is in HH:MM format as a string)
  const sleepTime = report.previous_night_sleep_time;
  if (sleepTime === "00:00") {
    sleepscore = 0;
  } else if (sleepTime >= "23:30") {
    sleepscore = 0;
  } else if (sleepTime >= "23:15") {
    sleepscore = 5;
  } else if (sleepTime >= "23:00") {
    sleepscore = 10;
  } else if (sleepTime >= "22:45") {
    sleepscore = 15;
  } else if (sleepTime >= "22:30") {
    sleepscore = 20;
  } else if (sleepTime >= "22:15") {
    sleepscore = 25;
  } else {
    sleepscore = 25;
  }

  // Wakeup score based on wakeup time
  const wakeupTime = report.morning_wakeup_time;
  if (wakeupTime >= "06:00") {
    wakeupscore = 0;
  } else if (wakeupTime >= "05:45") {
    wakeupscore = 5;
  } else if (wakeupTime >= "05:30") {
    wakeupscore = 10;
  } else if (wakeupTime >= "05:15") {
    wakeupscore = 15;
  } else if (wakeupTime >= "05:00") {
    wakeupscore = 20;
  } else if (wakeupTime >= "04:45") {
    wakeupscore = 25;
  } else {
    wakeupscore = 25;
  }

  // Day rest score based on rest duration
  const dayRestDuration = report.day_rest_duration;
  if (dayRestDuration > 135) {
    dayrestscore = -5;
  } else if (dayRestDuration > 120) {
    dayrestscore = 0;
  } else if (dayRestDuration > 105) {
    dayrestscore = 5;
  } else if (dayRestDuration > 90) {
    dayrestscore = 10;
  } else if (dayRestDuration > 75) {
    dayrestscore = 15;
  } else if (dayRestDuration > 60) {
    dayrestscore = 20;
  } else {
    dayrestscore = 25;
  }

  // Chanting score based on target chanting end time
  const chantingEndTime = report.target_chanting_end_time;
  if (chantingEndTime <= "07:15") {
    chantingscore = 25;
  } else if (chantingEndTime <= "09:30") {
    chantingscore = 20;
  } else if (chantingEndTime <= "13:00") {
    chantingscore = 15;
  } else if (chantingEndTime <= "19:00") {
    chantingscore = 10;
  } else if (chantingEndTime <= "21:00") {
    chantingscore = 5;
  } else if (chantingEndTime <= "23:00") {
    chantingscore = 0;
  } else if (chantingEndTime <= "23:59") {
    chantingscore = -5;
  }

  // Hearing score based on hearing duration
  const hearingDuration = report.hearing_duration;
  if (hearingDuration >= 30) {
    hearingscore = 25;
  } else if (hearingDuration >= 25) {
    hearingscore = 20;
  } else if (hearingDuration >= 20) {
    hearingscore = 15;
  } else if (hearingDuration >= 10) {
    hearingscore = 10;
  } else if (hearingDuration >= 5) {
    hearingscore = 5;
  } else if (hearingDuration >= 0) {
    hearingscore = 0;
  }

  // Reading score based on reading duration
  const readingDuration = report.reading_duration;
  if (readingDuration >= 30) {
    readingscore = 25;
  } else if (readingDuration >= 25) {
    readingscore = 20;
  } else if (readingDuration >= 20) {
    readingscore = 15;
  } else if (readingDuration >= 10) {
    readingscore = 10;
  } else if (readingDuration >= 5) {
    readingscore = 5;
  } else if (readingDuration >= 0) {
    readingscore = 0;
  }

  // Service score based on service duration
  const serviceDuration = report.service_duration;
  if (serviceDuration >= 30) {
    servicescore = 25;
  } else if (serviceDuration >= 25) {
    servicescore = 20;
  } else if (serviceDuration >= 20) {
    servicescore = 15;
  } else if (serviceDuration >= 15) {
    servicescore = 10;
  } else if (serviceDuration >= 10) {
    servicescore = 5;
  } else if (serviceDuration >= 5) {
    servicescore = 0;
  } else {
    servicescore = 0;
  }

  // Return the calculated scores
  return {
    sleepscore,
    wakeupscore,
    dayrestscore,
    chantingscore,
    hearingscore,
    readingscore,
    servicescore,
  };
}

module.exports = {
  calculateFinalResult,
  calculateScores,
};
