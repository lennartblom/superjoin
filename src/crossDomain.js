const MONDAY_TIME_DIFF = 1;
const TUESDAY_TIME_DIFF = 2;
const THURSDAY_TIME_DIFF = 4;
const SATURDAY_TIME_DIFF = 6;
const SUNDAY_TIME_DIFF = 7;
const MONDAY_CHANNEL_ID = "C01BXQKR9KM";
const TUESDAY_CHANNEL_ID = "C012C7UEX9C";
const THURSDAY_CHANNEL_ID = "C012K00AJFL";
const SATURDAY_CHANNEL_ID = "C012C7UQPSS";
const SUNDAY_CHANNEL_ID = "C01D7L86K8Q";

function getSpreadsheetName(channelId) {
  let fullTrainingWeekDayName = trainingDayForChannelId(channelId);
  let upcomingTrainingWeekDayDate = getUpcomingTrainingWeekDayDate(
    fullTrainingWeekDayName
  );

  return fullTrainingWeekDayName + " " + upcomingTrainingWeekDayDate;
}

/*
const MONDAY_TIME_DIFF = 1; // TIME DIFF or DATE DIFF ???
const TUESDAY_TIME_DIFF = 2;
const THURSDAY_TIME_DIFF = 4;
const SATURDAY_TIME_DIFF = 6;
const SUNDAY_TIME_DIFF = 7;

const WEEKDAY_TO_TRAININGDATE = {
	"Montag": {
  		diff: MONDAY_TIME_DIFF,
      startingtime: 18 // magicnumber in your code
  },
  "Dienstag": {
  	diff: TUESDAY_TIME_DIFF,
    startingtime: 18 // magicnumber in your code
  },
  "Sunday": {
  	diff: TUESDAY_TIME_DIFF,
    startingtime: 10 // magicnumber in your code
  }
}  

let fullTrainingWeekDayName = "Montag" // "Sunday"

// in der getUpcomingTrainingWeekDayDate()
// könntest ihr das so oderso ähnlich umschreiben, euer switch case geht aber auch klar
// finde die Schreibweise als object mit WEEKDAY_TO_TRAININGDATE ganz übersichtlich
// die Abstraktionen getThisWeeksMonday() usw verstehe ich allerdings nicht
// kommt mir irgendwie unnötig vor oder haben die einen tieferen Sinn?

let tempTrainingdate = WEEKDAY_TO_TRAININGDATE[fullTrainingWeekDayName]

const trainingDate = initializeWeekTrainingsDateWith(
	tempTrainingdate.diff, tempTrainingdate.startingtime
)

function initializeWeekTrainingsDateWith(diff, somenumber){
	console.log(diff, somenumber)
}
*/

function getUpcomingTrainingWeekDayDate(trainingDay) {
  let trainingDate;
  switch (trainingDay) {
    case "Montag":
      trainingDate = getThisWeeksMonday();
      break;
    case "Dienstag":
      trainingDate = getThisWeeksTuesday();
      break;
    case "Donnerstag":
      trainingDate = getThisWeeksThursday();
      break;
    case "Samstag":
      trainingDate = getThisWeeksSaturday();
      break;

    case "Sonntag":
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
  return initializeWeekTrainingsDateWith(MONDAY_TIME_DIFF, 18);
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
    case MONDAY_CHANNEL_ID:
      return "Montag";
    case TUESDAY_CHANNEL_ID:
      return "Dienstag";
    case THURSDAY_CHANNEL_ID:
      return "Donnerstag";
    case SATURDAY_CHANNEL_ID:
      return "Samstag";
    case SUNDAY_CHANNEL_ID:
      return "Sonntag";
  }
}

exports.getSpreadsheetName = getSpreadsheetName;
exports.MONDAY_CHANNEL_ID = MONDAY_CHANNEL_ID;
exports.TUESDAY_CHANNEL_ID = TUESDAY_CHANNEL_ID;
exports.THURSDAY_CHANNEL_ID = THURSDAY_CHANNEL_ID;
exports.SATURDAY_CHANNEL_ID = SATURDAY_CHANNEL_ID;
exports.SUNDAY_CHANNEL_ID = SUNDAY_CHANNEL_ID;
