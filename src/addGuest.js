const { getSpreadsheetName } = require("./crossDomain");

function addGuest(e) {
  if (typeof e === "undefined") {
    return;
  }

  const spreadsheetApp = SpreadsheetApp.getActiveSpreadsheet();

  const userName = e.parameter.text;
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
    if(row[0] === userName) {
      alreadyInList = true;
    }
  });

  if (alreadyInList) {
    const output = userName + "ist schon beim Training " + spreadsheetName +
      " dabei. Du brauchst sie/ihn also nicht mehr einzutragen! :white_check_mark: :woman-running: :runner: ";
    return generateResultMessage(output, false);
  }
  addParticipantToSpreadsheet(spreadsheet, userName, userId);

  let output = userName + "ist als Gast am " + spreadsheetName + " dabei :confetti_ball:";
  return generateResultMessage(output, true);
}

function newSheet(spreadsheetApp, sheetName) {
  const sheet = spreadsheetApp.insertSheet(sheetName);

  return sheet.appendRow(["Name", "ID", "Eingetragen um"]);
}

module.exports = addGuest;

exports._test = {
  addGuest: addGuest,
};
