const TUESDAY_TIME_DIFF = 2;
const THURSDAY_TIME_DIFF = 4;
const SATURDAY_TIME_DIFF = 6;

function getThisWeeksTuesday() {
  const thisWeeksTuesday = new Date(Date.now());
  const today = thisWeeksTuesday.getDate();
  const dayOfTheWeek = thisWeeksTuesday.getDay();
  thisWeeksTuesday.setDate(today - dayOfTheWeek + TUESDAY_TIME_DIFF);
  thisWeeksTuesday.setHours(18, 0, 0, 0);

  if (new Date() < thisWeeksTuesday) {
    return new Date(thisWeeksTuesday);
  }
  const nextWeeksTraining = new Date(thisWeeksTuesday);
  return new Date(nextWeeksTraining.setDate(nextWeeksTraining.getDate() + 7));
}

function getThisWeeksThursday() {
  const thisWeeksTuesday = new Date(Date.now());
  const today = thisWeeksTuesday.getDate();
  const dayOfTheWeek = thisWeeksTuesday.getDay();
  thisWeeksTuesday.setDate(today - dayOfTheWeek + THURSDAY_TIME_DIFF);
  thisWeeksTuesday.setHours(18, 0, 0, 0);

  if (new Date() < thisWeeksTuesday) {
    return new Date(thisWeeksTuesday);
  }
  const nextWeeksTraining = new Date(thisWeeksTuesday);
  return new Date(nextWeeksTraining.setDate(nextWeeksTraining.getDate() + 7));
}

function getThisWeeksSaturday() {
  const thisWeeksSaturday = new Date(Date.now());
  const today = thisWeeksSaturday.getDate();
  const dayOfTheWeek = thisWeeksSaturday.getDay();
  thisWeeksSaturday.setDate(today - dayOfTheWeek + SATURDAY_TIME_DIFF);
  thisWeeksSaturday.setHours(10, 0, 0, 0);

  if (new Date() < thisWeeksSaturday) {
    return new Date(thisWeeksSaturday);
  }
  const nextWeeksTraining = new Date(thisWeeksSaturday);
  return new Date(nextWeeksTraining.setDate(nextWeeksTraining.getDate() + 7));
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

function trainingDayForChannelId(channelId) {
  if (channelId === "C012C7UEX9C") {
    return "Dienstag";
  }

  if (channelId === "C012K00AJFL") {
    return "Donnerstag";
  }

  if (channelId === "C012C7UQPSS") {
    return "Samstag";
  }
}

function getUpcomingTrainingWeekDayDate(trainingDay) {
  let trainingDate;
  if (trainingDay === "Dienstag") {
    trainingDate = getThisWeeksTuesday();
  } else if (trainingDay === "Donnerstag") {
    trainingDate = getThisWeeksThursday();
  } else if (trainingDay === "Samstag") {
    trainingDate = getThisWeeksSaturday();
  }

  return getTrainingDateAsGermanDateFormat(trainingDate);
}

function saveNewTrainingAttendeeToSpreadSheet(
  fullTrainingWeekDayName,
  upcomingTrainingWeekDayDate,
  spreadsheetApp,
  userName
) {
  const spreadsheetName =
    fullTrainingWeekDayName + " " + upcomingTrainingWeekDayDate;
  let spreadsheet = spreadsheetApp.getSheetByName(spreadsheetName);

  if (spreadsheet == null) {
    spreadsheet = newSheet(spreadsheetApp, spreadsheetName);
  }

  spreadsheet.appendRow([userName, Date.now()]);

  return spreadsheetName;
}

function newSheet(spreadsheetApp, sheetName) {
  const sheet = spreadsheetApp.insertSheet(sheetName);

  return sheet.appendRow(["Name", "Eingetragen um"]);
}

function participate(e) {
  if (typeof e === "undefined") {
    return;
  }

  const spreadsheetApp = SpreadsheetApp.getActiveSpreadsheet();

  const userName = e.parameter.user_name;
  const channelId = e.parameter.channel_id;

  let fullTrainingWeekDayName = trainingDayForChannelId(channelId);
  let upcomingTrainingWeekDayDate = getUpcomingTrainingWeekDayDate(
    fullTrainingWeekDayName
  );

  let spokenTrainingDate = saveNewTrainingAttendeeToSpreadSheet(
    fullTrainingWeekDayName,
    upcomingTrainingWeekDayDate,
    spreadsheetApp,
    userName
  );

  return (
    "Du bist beim Training am " + spokenTrainingDate + " dabei :confetti_ball:"
  );
}

module.exports = participate;
