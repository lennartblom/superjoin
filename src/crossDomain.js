const MONDAY_TIME_DIFF = 1;
const TUESDAY_TIME_DIFF = 2;
const THURSDAY_TIME_DIFF = 4;
const SATURDAY_TIME_DIFF = 6;
const SUNDAY_TIME_DIFF = 7;
const MONDAY_STABILITY_CHANNEL_ID = "C01FGDKUNLC";
const MONDAY_CHANNEL_ID = "C01BXQKR9KM";
const TUESDAY_CHANNEL_ID = "C012C7UEX9C";
const THURSDAY_CHANNEL_ID = "C012K00AJFL";
const SATURDAY_CHANNEL_ID = "C012C7UQPSS";
const SUNDAY_CHANNEL_ID = "C01D7L86K8Q";

const MONDAY_STABILITY_TRAINING_NAME = "Montag Stabi";
const MONDAY_TRAINING_NAME = "Montag";
const TUESDAY_TRAINING_NAME = "Dienstag";
const THURSDAY_TRAINING_NAME = "Donnerstag";
const SATURDAY_TRAINING_NAME = "Samstag";
const SUNDAY_TRAINING_NAME = "Sonntag";

function getSpreadsheetName(channelId) {
  let fullTrainingWeekDayName = trainingDayForChannelId(channelId);
  let upcomingTrainingWeekDayDate = getUpcomingTrainingWeekDayDate(
    fullTrainingWeekDayName
  );

  return fullTrainingWeekDayName + " " + upcomingTrainingWeekDayDate;
}

function getUpcomingTrainingWeekDayDate(trainingDay) {
  let trainingDate;
  switch (trainingDay) {
    case MONDAY_TRAINING_NAME:
    case MONDAY_STABILITY_TRAINING_NAME:
      trainingDate = getThisWeeksMonday();
      break;
    case TUESDAY_TRAINING_NAME:
      trainingDate = getThisWeeksTuesday();
      break;
    case THURSDAY_TRAINING_NAME:
      trainingDate = getThisWeeksThursday();
      break;
    case SATURDAY_TRAINING_NAME:
      trainingDate = getThisWeeksSaturday();
      break;

    case SUNDAY_TRAINING_NAME:
      trainingDate = getThisWeeksSunday();
      break;
  }

  return getTrainingDateAsGermanDateFormat(trainingDate);
}

function getTrainingDateAsGermanDateFormat(trainingDate) {
  return (
    trainingDate.getUTCDate() +
    "." +
    (trainingDate.getMonth() + 1) +
    "." +
    trainingDate.getFullYear()
  );
}

function getThisWeeksMonday() {
  return initializeWeekTrainingsDateWith(MONDAY_TIME_DIFF, 19);
}

function getThisWeeksTuesday() {
  return initializeWeekTrainingsDateWith(TUESDAY_TIME_DIFF, 18);
}

function getThisWeeksThursday() {
  return initializeWeekTrainingsDateWith(THURSDAY_TIME_DIFF, 18);
}

function getThisWeeksSaturday() {
  return initializeWeekTrainingsDateWith(SATURDAY_TIME_DIFF, 10);
}

function getThisWeeksSunday() {
  return initializeWeekTrainingsDateWith(SUNDAY_TIME_DIFF, 10);
}

function initializeWeekTrainingsDateWith(weekDayDiff, trainingStartHours) {
  const thisWeeksTuesday = new Date(Date.now());
  const today = thisWeeksTuesday.getDate();
  const dayOfTheWeek = thisWeeksTuesday.getDay();
  thisWeeksTuesday.setDate(today - dayOfTheWeek + weekDayDiff);
  thisWeeksTuesday.setHours(trainingStartHours, 0, 0, 0);

  if (new Date() < thisWeeksTuesday) {
    return new Date(thisWeeksTuesday);
  }
  const nextWeeksTraining = new Date(thisWeeksTuesday);
  return new Date(nextWeeksTraining.setDate(nextWeeksTraining.getDate() + 7));
}

function trainingDayForChannelId(channelId) {
  switch (channelId) {
    case MONDAY_STABILITY_CHANNEL_ID:
      return MONDAY_STABILITY_TRAINING_NAME;
    case MONDAY_CHANNEL_ID:
      return MONDAY_TRAINING_NAME;
    case TUESDAY_CHANNEL_ID:
      return TUESDAY_TRAINING_NAME;
    case THURSDAY_CHANNEL_ID:
      return THURSDAY_TRAINING_NAME;
    case SATURDAY_CHANNEL_ID:
      return SATURDAY_TRAINING_NAME;
    case SUNDAY_CHANNEL_ID:
      return SUNDAY_TRAINING_NAME;
  }
}

exports.getSpreadsheetName = getSpreadsheetName;
exports.MONDAY_CHANNEL_ID = MONDAY_CHANNEL_ID;
exports.MONDAY_STABILITY_CHANNEL_ID = MONDAY_STABILITY_CHANNEL_ID;
exports.TUESDAY_CHANNEL_ID = TUESDAY_CHANNEL_ID;
exports.THURSDAY_CHANNEL_ID = THURSDAY_CHANNEL_ID;
exports.SATURDAY_CHANNEL_ID = SATURDAY_CHANNEL_ID;
exports.SUNDAY_CHANNEL_ID = SUNDAY_CHANNEL_ID;
