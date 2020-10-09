const getSpreadsheetName = require("./crossDomain");

function saveNewTrainingAttendeeToSpreadSheet(
  channelId,
  spreadsheetApp,
  userName
) {

  let spreadsheetName = getSpreadsheetName(channelId);
  let spreadsheet = spreadsheetApp.getSheetByName(spreadsheetName);

  if (spreadsheet == null) {
    spreadsheet = newSheet(spreadsheetApp, spreadsheetName);
  }

  spreadsheet.appendRow([userName, new Date().toISOString()]);

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

  let spokenTrainingDate = saveNewTrainingAttendeeToSpreadSheet(
    channelId,
    spreadsheetApp,
    userName
  );

  return (
    "Du bist beim Training am " + spokenTrainingDate + " dabei :confetti_ball:"
  );
}

module.exports = participate;

exports._test = {
  participate: participate,
};
