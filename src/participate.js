const {getSpreadsheetName} = require("./crossDomain");
const {getUserName} = require("./getUserName");

function participate(e) {
  if (typeof e === "undefined") {
    return;
  }

  const spreadsheetApp = SpreadsheetApp.getActiveSpreadsheet();

  const userName = getUserName(e.parameter.user_name, e.parameter.user_id);
  const channelId = e.parameter.channel_id;
  const userId = e.parameter.user_id;

  return saveNewTrainingAttendeeToSpreadSheet(
    channelId,
    spreadsheetApp,
    userName,
    userId
  );
}

function addParticipantToSpreadsheet(newSpreadsheet, userName, userId) {
  newSpreadsheet.appendRow([userName, userId, new Date().toISOString()]);
}

function createSpreadsheetAndAddParticipant(spreadsheetApp, spreadsheetName, userName, userId) {
  const newSpreadsheet = newSheet(spreadsheetApp, spreadsheetName);
  addParticipantToSpreadsheet(newSpreadsheet, userName, userId);
  return spreadsheetName;
}

function generateResultMessage(output, newParticipant) {
  return [output, newParticipant];
}

function saveNewTrainingAttendeeToSpreadSheet(
  channelId,
  spreadsheetApp,
  userName,
  userId
) {

  let spreadsheetName = getSpreadsheetName(channelId);
  let spreadsheet = spreadsheetApp.getSheetByName(spreadsheetName);

  if (spreadsheet == null) {
    const output = createSpreadsheetAndAddParticipant(
      spreadsheetApp,
      spreadsheetName,
      userName,
      userId
    );
    return generateResultMessage(output, true);
  }

  let upcomingTrainingParticipants = spreadsheet.getDataRange().getValues();
  let alreadyInList = false;
  upcomingTrainingParticipants.forEach(function (row) {
    if(row[1] === userId) {
      alreadyInList = true;
    }
  });

  if (alreadyInList) {
    const output = "Du bist schon beim Training " + spreadsheetName +
      " dabei. Brauchst dich also nicht mehr eintragen! :white_check_mark: :woman-running: :runner: ";
    return generateResultMessage(output, false);
  }
  addParticipantToSpreadsheet(spreadsheet, userName, userId);

  let output = "Du bist beim Training am " + spreadsheetName + " dabei :confetti_ball:";
  return generateResultMessage(output, true);
}

function newSheet(spreadsheetApp, sheetName) {
  const sheet = spreadsheetApp.insertSheet(sheetName);

  return sheet.appendRow(["Name", "ID", "Eingetragen um"]);
}

module.exports = participate;

exports._test = {
  participate: participate,
};
