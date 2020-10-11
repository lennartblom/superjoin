const participate = require("./participate");
const listParticipants = require("./listParticipants");
const {notifyAboutParticipant} = require("./channelNotifications")

const PARTICIPATE_COMMAND = "/dabei";
const LIST_PARTICIPANTS_COMMAND = "/teilnehmer";

function doPost(e) {
  if (typeof e === "undefined") {
    return;
  }

  let textOutput;

  let command = e.parameter.command;
  Logger.log(command);

  switch (command) {
    case PARTICIPATE_COMMAND: {
      const result = participate(e);
      textOutput = result[0] + listParticipants(e);
      if (result[1]) {
        notifyAboutParticipant(e);
      }
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
