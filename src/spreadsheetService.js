const { getSpreadsheetName } = require("./crossDomain");

function newSheet(spreadsheetApp, sheetName) {
  const sheet = spreadsheetApp.insertSheet(sheetName);

  return sheet.appendRow(["Name", "ID", "Eingetragen um"]);
}

function addParticipantToSpreadsheet(spreadsheetApp, userName, userId) {
  spreadsheetApp.appendRow([userName, userId, new Date().toISOString()]);
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
    spreadsheet = newSheet(spreadsheetApp, sheetName);
    addParticipantToSpreadsheet(spreadsheet, userName, userId);

    return [spreadsheetName, true];
  }

  let upcomingTrainingParticipants = spreadsheet.getDataRange().getValues();
  let alreadyInList = false;
  upcomingTrainingParticipants.forEach(function (row) {
    if (row[1] === userId) {
      alreadyInList = true;
    }
  });

  if (alreadyInList) {
    return [spreadsheetName, false];
  }
  addParticipantToSpreadsheet(spreadsheet, userName, userId);

  return [spreadsheetName, true];
}

module.exports = {
  saveNewTrainingAttendeeToSpreadSheet,
};

exports._test = {
  saveNewTrainingAttendeeToSpreadSheet,
};
