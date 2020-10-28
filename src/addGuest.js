const {
  saveNewTrainingAttendeeToSpreadSheet,
} = require("./spreadsheetService");

function addGuest(e) {
  if (typeof e === "undefined") {
    return;
  }

  const spreadsheetApp = SpreadsheetApp.getActiveSpreadsheet();

  const userName = e.parameter.text;
  const channelId = e.parameter.channel_id;
  const userId = e.parameter.text;

  const addedToSpreadsheet = saveNewTrainingAttendeeToSpreadSheet(
    channelId,
    spreadsheetApp,
    userName,
    userId
  );

  if (addedToSpreadsheet[1]) {
    return generateSuccessMessage(addedToSpreadsheet[0], userName);
  } else {
    return generateFailureMessage(addedToSpreadsheet[0], userName);
  }
}

function generateSuccessMessage(spreadsheetName, userName) {
  return [
    userName + " ist als Gast am " + spreadsheetName + " dabei :confetti_ball:",
    true,
  ];
}

function generateFailureMessage(spreadsheetName, userName) {
  return [
    userName +
      " ist schon beim Training " +
      spreadsheetName +
      " dabei. Du brauchst sie/ihn also nicht mehr einzutragen! :white_check_mark: :woman-running: :runner: ",
    false,
  ];
}

module.exports = addGuest;

exports._test = {
  addGuest: addGuest,
};
