const { getUserName } = require("./getUserName");
const {
  saveNewTrainingAttendeeToSpreadSheet,
} = require("./spreadsheetService");

function participate(e) {
  if (typeof e === "undefined") {
    return;
  }

  const spreadsheetApp = SpreadsheetApp.getActiveSpreadsheet();

  const userName = getUserName(e.parameter.user_name, e.parameter.user_id);
  const channelId = e.parameter.channel_id;
  const userId = e.parameter.user_id;

  const addedToSpreadsheet = saveNewTrainingAttendeeToSpreadSheet(
    channelId,
    spreadsheetApp,
    userName,
    userId
  );

  function generateSuccessMessage(spreadsheetName) {
    return [
      "Du bist beim Training am " + spreadsheetName + " dabei :confetti_ball:",
      true,
    ];
  }

  function generateFailureMessage(spreadsheetName) {
    return [
      "Du bist schon beim Training " +
        spreadsheetName +
        " dabei. Brauchst dich also nicht mehr eintragen! :white_check_mark: :woman-running: :runner: ",
      false,
    ];
  }

  if (addedToSpreadsheet[1]) {
    return generateSuccessMessage(addedToSpreadsheet[0]);
  } else {
    return generateFailureMessage(addedToSpreadsheet[0]);
  }
}

module.exports = participate;

exports._test = {
  participate: participate,
};
