const participate = require("./participate");
const listParticipants = require("./listParticipants");

const PARTICIPATE_COMMAND = "/dabei";
const LIST_PARTICIPANTS_COMMAND = "/teilnehmer";

function doPost(e) {
  if (typeof e === "undefined") {
    return;
  }

  let textOutput;

  let command = e.parameter.command;

  switch (command) {
    case PARTICIPATE_COMMAND: {
      textOutput = participate(e);
      break;
    }
    case LIST_PARTICIPANTS_COMMAND: {
      textOutput = listParticipants(e);
      break;
    }
  }

  return ContentService.createTextOutput(textOutput);
}

exports._test = {
  doPost: doPost,
};
