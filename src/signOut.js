const {getUserName} = require("./getUserName");
const {getSpreadsheetName} = require("./crossDomain");

function signOut(e) {
  if (typeof e === "undefined") {
    return;
  }

  const channelId = e.parameter.channel_id;
  const userName = getUserName(e.parameter.user_name, e.parameter.user_id);
  const spreadsheetApp = SpreadsheetApp.getActiveSpreadsheet();

  let spreadsheetName = getSpreadsheetName(channelId);

  let trainingSpreadSheet = spreadsheetApp.getSheetByName(spreadsheetName);

  const participantsRowIndex = getParticipantsRowIndex(trainingSpreadSheet, userName);
  if (participantsRowIndex < 0) {
    return ["Du bist gar nicht beim Training angemeldet", false];
  }
  trainingSpreadSheet.deleteRow(participantsRowIndex + 1);
  return ["Du hast dich erfolgreich vom Training abgemeldet", true];
}

function getParticipantsRowIndex(trainingSpreadSheet, userName) {
  const participantsRows = trainingSpreadSheet.getDataRange().getValues();

  let counter = 0;
  let indexToFind = -1;
  participantsRows.forEach(function (row) {
    if (row[0] === userName) {
      indexToFind = counter;
    }

    counter++;
  });

  return indexToFind;
}

module.exports = {
  signOut: signOut
}
