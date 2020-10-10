const getSpreadsheetName = require("./crossDomain");

function addParticipantToSpreadsheet(newSpreadsheet, userName) {
  newSpreadsheet.appendRow([userName, new Date().toISOString()]);
}

function createSpreadsheetAndAddParticipant(spreadsheetApp, spreadsheetName, userName) {
  const newSpreadsheet = newSheet(spreadsheetApp, spreadsheetName);
  addParticipantToSpreadsheet(newSpreadsheet, userName);
  return spreadsheetName;
}

function saveNewTrainingAttendeeToSpreadSheet(
  channelId,
  spreadsheetApp,
  userName
) {

  let spreadsheetName = getSpreadsheetName(channelId);
  let spreadsheet = spreadsheetApp.getSheetByName(spreadsheetName);

  if (spreadsheet == null) {
    return createSpreadsheetAndAddParticipant(
      spreadsheetApp,
      spreadsheetName,
      userName
    );
  }

  let upcomingTrainingParticipants = spreadsheet.getDataRange().getValues();
  let alreadyInList = false;
  upcomingTrainingParticipants.forEach(function (row) {
    if(row[0] === userName) {
      alreadyInList = true;
    }
  });

  if (alreadyInList) {
    console.log("Member already in list");
    console.log(spreadsheetName);
    return "Du bist schon beim Training " + spreadsheetName +
      " dabei. Brauchst dich also nicht mehr eintragen! :white_check_mark: :woman-running: :runner: ";
  }
  addParticipantToSpreadsheet(spreadsheet, userName);

  return "Du bist beim Training am " + spreadsheetName + " dabei :confetti_ball:";
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

  return saveNewTrainingAttendeeToSpreadSheet(
    channelId,
    spreadsheetApp,
    userName
  );
}

module.exports = participate;

exports._test = {
  participate: participate,
};
